//TO DO: make a pause button that covers the screen but keeps the background.
// Global variables will be created in solidity. Here not for ease of testing.
// Artwork panel
let artWorkIPFS = "Qmb4obBzUofeZtcUxhEWUYCmhneZMzCrBQrNGnJnqKNyDq"
let scoreCardIPFS = "QmTSBSHXJgnVg16pjxnH3CAqkL4QDtBwr6aSHkbvhZFmR3"
let gameIPFS = "QmTSBSHXJgnVg16pjxnH3CAqkL4QDtBwr6aSHkbvhZFmR3"

// Game panel text
let tierName = "Warriors"
let prizePool = '123' // Ξ
let phase = '1'; // 1 = mint, 2 = refund, 3 = active game 4 = game over claim open
let timeRemaining = 'xyz';
let totalMinted = '123'; // Int
let burnToClaim = '69.4201'; // Ξ
// Scorecard panel text
// TODO: add more text from solidity to create barchart style scorecard
// Font file
// let font = has been moved to own file for testing. Will be set in solidity.
// called in sol using DefifaFontImporter.getSkinnyFontSource(),
// End globals 

// use WASD to move freely around the page
let page, camLoc, buttL, buttR, timer
let pages = [];
let numOfPages = 3;
let movingRight = false;
let movingLeft = false;
let isPaused = false;
let artWorkPanel = "https://gateway.pinata.cloud/ipfs/" + artWorkIPFS;
let scoreCardPanel = "https://gateway.pinata.cloud/ipfs/" + scoreCardIPFS;
let gamePanel = "https://gateway.pinata.cloud/ipfs/" + gameIPFS;

let defifaBlue = [19, 228, 240];


let txt1 = [
  ["Prize Pool: ", defifaBlue],
  [prizePool, defifaBlue],
  ["", defifaBlue]
];
let txt2 = [
  ["Phase: ", defifaBlue],
  [phase, defifaBlue],
  ["", defifaBlue]
];
let txt3 = [
  ["Time Remaining: ", defifaBlue],
  [timeRemaining, defifaBlue],
  ["", defifaBlue]
];
let txt4 = [
  ["Total Minted: ", defifaBlue],
  [totalMinted, defifaBlue],
  ["", defifaBlue]
];
let txt5 = [
  ["Burn to Claim: ", defifaBlue],
  [burnToClaim, defifaBlue],
  ["", defifaBlue]
];
let txt6 = [
  ["Team: ", defifaBlue],
  [tierName, defifaBlue],
  ["", defifaBlue]
];
let pageImg = []

function preload() {
  pageImg[0] = loadImage(artWorkPanel);
  pageImg[1] = loadImage(scoreCardPanel);
  pageImg[2] = loadImage(gamePanel);
}
function setup() {
  myFont = loadFont(font);
  createCanvas(400, 400);
  camLoc = createVector(0, 0); // camLoc just means camera location. this will be the location of the canvas.
  for (let i = 0; i < numOfPages; i++) {
    pages[i] = new Page(canvas.width / 2 * i, 0, i, pageImg[i]);
  }
  timer = canvas.width / 2

  buttL = new Button(10, canvas.height / 2 - 30, 50, 25, "<");
  buttR = new Button(canvas.width / 2 - 90, canvas.height / 2 - 30, 50, 25, ">");

}

function draw() {
  background(220);
  slide()

  push();
  translate(camLoc.x, camLoc.y); // translates the view of your page (AKA the canvas) to the camLoc

  for (let i = 0; i < numOfPages; i++) {
    pages[i].run();
  }

  pop();
  buttL.run()
  buttR.run()
}
function goRight() {
  if (!movingLeft && !isPaused) {
    movingRight = true;
  }
}
function goLeft() {
  if (!movingRight && !isPaused) {
    movingLeft = true;
  }
}

function slide() {
  let slideSpeed = 20
  if (movingRight && !movingLeft && timer >= 0) {
    camLoc.x -= slideSpeed;
    timer -= slideSpeed;
  }

  if (movingLeft && !movingRight && timer >= 0) {
    camLoc.x += slideSpeed;
    timer -= slideSpeed;
  }

  if (timer == 0) {
    movingRight = false;
    movingLeft = false;
    timer = canvas.width / 2;
  }


  //checks if the camLoc is past the fist page and sets it to 0 if true.
  if (-camLoc.x <= 0) {
    camLoc.x = 0;
    buttL.loc.x = -100 // sets the location of the left button out of view
  } else {
    buttL.loc.x = 10, canvas.height / 2 - 30 // sets the location of the left button inside the view of the page
  }
  // checks if the camLoc is past the last page and set it to the loc of hte last page if it is.
  if (-camLoc.x >= pages[pages.length - 1].loc.x) {
    timer = canvas.width / 2
    movingRight = false;
    movingLeft = false;
    camLoc.x = -pages[pages.length - 1].loc.x
    buttR.loc.x = -100
  } else {
    buttR.loc.x = canvas.height / 2 - 90 // sets the location of the right button inside the view of the page

  }

}

// NOTE: the keyPressed function is only so you can move freely and should be removed later!
function keyPressed() { //key listener for moving with w a s d
  let moveSpeed = 20
  if (keyCode === 87) { // key code for w
    camLoc.y += moveSpeed;
  } else if (keyCode === 83) { // key code for s
    camLoc.y -= moveSpeed
  } else if (keyCode === 65) { // key code for a
    camLoc.x += moveSpeed
  } else if (keyCode === 68) { // key code for d
    camLoc.x -= moveSpeed
  }
}

function drawtext(x, y, text_array) {

  var pos_x = x;
  for (var i = 0; i < text_array.length; ++i) {
    var part = text_array[i];
    var t = part[0];
    var c = part[1];
    var w = textWidth(t);
    fill(c);
    text(t, pos_x, y);
    pos_x += w;
  }
}

function mousePressed() { // mouse pressed listener
  if ( // checks if the mouse is over the left button
    mouseX > buttL.loc.x &&
    mouseX < buttL.loc.x + buttL.w &&
    mouseY > buttL.loc.y &&
    mouseY < buttL.loc.y + buttL.h
  ) {
    goLeft();
  }
  if ( // checks if the mouse is over the right button
    mouseX > buttR.loc.x &&
    mouseX < buttR.loc.x + buttR.w &&
    mouseY > buttR.loc.y &&
    mouseY < buttR.loc.y + buttR.h
  ) {
    goRight();
  }
}


class Page {
  constructor(x, y, pageIndex, img) {
    this.loc = createVector(x, y); // the x and y are the top left of the page
    // for some reason the canvas width and height is double what is suposted to be so i just divided it by 2
    this.w = canvas.width / 2;
    this.h = canvas.height / 2;
    this.pageNum = pageIndex + 1; // added one so you start at page 1 not page 0
    this.img = img;
  }

  run() {
    // image(this.img, this.loc.x, this.loc.y, canvas.width/2, canvas.heigh/2)
    image(this.img, this.loc.x, this.loc.y, 400, 400)

    // just shows the text
    textSize(20);
    textAlign(LEFT);
    textFont(myFont);

    //drawtext(this.loc.x + 112, this.loc.y + 30, string );
    //KMac clean this up, dry
    if (this.pageNum == 2) {
      drawtext(this.loc.x + 112, this.loc.y + 30, txt6);
      drawtext(this.loc.x + 112, this.loc.y + 70, txt1);
      drawtext(this.loc.x + 112, this.loc.y + 110, txt2);
      drawtext(this.loc.x + 112, this.loc.y + 150, txt3);
      drawtext(this.loc.x + 112, this.loc.y + 190, txt4);
      drawtext(this.loc.x + 112, this.loc.y + 230, txt5);
    };
    if (this.pageNum == 3) {
      // to do set text and buttons
    }

    // makes a box around the page
    line(this.loc.x, this.loc.y, this.loc.x + this.w, this.loc.y)
    line(this.loc.x, this.loc.y, this.loc.x, this.loc.y + this.h)
    line(this.loc.x, this.loc.y + this.h, this.loc.x + this.w, this.loc.y + this.h)
    line(this.loc.x + this.w, this.loc.y, this.loc.x + this.w, this.h)
  }
}
class Button {
  constructor(x, y, w, h, t) {
    this.loc = new createVector(x, y);
    this.w = w;
    this.h = h;
    this.text = t;
    this.clr = "white"
  }
  run() {
    this.render()
    this.checkMouse();
  }
  render() {
    fill(this.clr)
    stroke(20)
    strokeWeight(2)
    rect(this.loc.x, this.loc.y, this.w, this.h, 10)
    fill("black")
    noStroke()
    textSize(15)
    text(this.text, this.loc.x + (this.w / 2) - 5, this.loc.y + (this.h / 2) + 3)
  }
  checkMouse() {
    if (
      mouseX > this.loc.x &&
      mouseX < this.loc.x + this.w &&
      mouseY > this.loc.y &&
      mouseY < this.loc.y + this.h
    ) {
      this.clr = "gray"
    } else {
      this.clr = "white"
    }
  }
}