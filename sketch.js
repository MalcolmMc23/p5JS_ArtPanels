// Global variables will be created in solidity. Here not for ease of testing.
// Artwork panel
let artWorkIPFS = "QmSX1ktBWiTX1BJs8hDEVN93vRVJq6iNrpR36ByjRXfLra"
let scoreCardIPFS = "QmeB47KfbHetHPpQrPgmD9CxCDb9e2U9j9fxLr1FM3vzMo"
let buttonImageIPFS = "QmdpL1xN4cAHQw4P1FZzw9P3oQofA8h45PfuTTbpV4BbJV"
// Game panel text
let tierName = "Caveliers"
let prizePool = '123' // Ξ
let phase = '1'; // 1 = mint, 2 = refund, 3 = active game 4 = game over claim open
let timeRemaining = 'xyz';
let totalMinted = '123'; // Int
let burnToClaim = '69.4201'; // Ξ
// Font file
// let font = has been moved to own file for testing. Will be set in solidity.
// called in sol using DefifaFontImporter.getSkinnyFontSource(),
// End globals 

let page, camLoc, buttL, buttR, timer
let pages = [];
let numOfPages = 2;
let movingRight = false;
let movingLeft = false;
let isPaused = false;
// IMPORTRANT TODO: Defifa IPFA Pinner/Gateway ??
let artWorkPanel = "https://tan-hidden-whippet-249.mypinata.cloud/ipfs/" + artWorkIPFS;
let scoreCardPanel = "https://tan-hidden-whippet-249.mypinata.cloud/ipfs/" + scoreCardIPFS;
let buttonImage = "https://tan-hidden-whippet-249.mypinata.cloud/ipfs/" + buttonImageIPFS;
let defifaBlue = [19, 228, 240];

// Consider moving into smart contract??
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
let pageImg = [];
let buttonImg;

function preload() {
  pageImg[0] = loadImage(artWorkPanel);
  pageImg[1] = loadImage(scoreCardPanel);
  buttonImg = loadImage(buttonImage);

}
function setup() {
  myFont = loadFont(font);
  createCanvas(400, 400);
  camLoc = createVector(0, 0); // camLoc just means camera location. this will be the location of the canvas.
  for (let i = 0; i < numOfPages; i++) {
    pages[i] = new Page(canvas.width / 2 * i, 0, i, pageImg[i]);
  }
  timer = canvas.width / 2

  //buttL = new Button(10, canvas.height / 2 - 50, 50, 50, buttonImg);
  
  buttL = new Button(canvas.width / 2 - 90, 5, 75, 75, buttonImg);
  buttR = new Button(canvas.width / 2 - 90, 5, 75, 75, buttonImg);
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
    //buttL.loc.x = 0, canvas.height / 2 - 30 // sets the location of the left button inside the view of the page
    buttL.loc.x = canvas.height / 2 - 75
  }
  // checks if the camLoc is past the last page and set it to the loc of the last page if it is.
  if (-camLoc.x >= pages[pages.length - 1].loc.x) {
    timer = canvas.width / 2
    movingRight = false;
    movingLeft = false;
    camLoc.x = -pages[pages.length - 1].loc.x
    buttR.loc.x = -100
  } else {
    buttR.loc.x = canvas.height / 2 - 75 // sets the location of the right button inside the view of the page

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

    //drawtext(this.loc.x + 65, this.loc.y + 30, string );
    //KMac clean this up, dry
    if (this.pageNum == 2) {
      drawtext(this.loc.x + 65, this.loc.y + 50, txt6);
      drawtext(this.loc.x + 65, this.loc.y + 90, txt1);
      drawtext(this.loc.x + 65, this.loc.y + 130, txt2);
      drawtext(this.loc.x + 65, this.loc.y + 170, txt3);
      drawtext(this.loc.x + 65, this.loc.y + 210, txt4);
      drawtext(this.loc.x + 65, this.loc.y + 250, txt5);
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
  constructor(x, y, w, h, inImg) {
    this.loc = new createVector(x, y);
    this.w = w;
    this.h = h;
    this.clr = "white";
    this.img  = inImg;
  }
  run() {
    this.render()
    this.checkMouse();
  }
  render() {
    fill(this.clr)
    stroke(20)
    strokeWeight(0)
    //rect(this.loc.x, this.loc.y, this.w, this.h, 10)
    fill("black")
    noStroke()
    textSize(15)
    //text(this.text, this.loc.x + (this.w / 2) - 5, this.loc.y + (this.h / 2) + 3)
    image(this.img,this.loc.x, this.loc.y, this.w, this.h);
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