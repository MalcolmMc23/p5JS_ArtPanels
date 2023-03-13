//TO DO: make a pause button that covers the screen but keeps the background.

// use WASD to move freely around the page
let page, camLoc, buttLeft, buttRight, timer
let pages = [];
let numOfPages = 3;
let movingRight = false;
let movingLeft = false;
let isPaused = false;

let pageImg = []

function preload() {

  pageImg[1] = loadImage(skyAndEarth);
}
function setup() {
  createCanvas(400, 400);
  camLoc = createVector(0, 0); // camLoc just means camera location. this will be the location of the canvas.
  for (let i = 0; i < numOfPages; i++) {
    pages[i] = new Page(canvas.width / 2 * i, 0, i, pageImg[1]);
  }
  buttLeft = createButton("Move Left"); // creates a button
  buttLeft.position(10, canvas.height / 2 - 30)// sets the button in the bottem left
  buttRight = createButton("Move Right"); // creates a button
  buttRight.position(canvas.width / 2 - 90, canvas.height / 2 - 30) // sets the button in the bottem right
  timer = canvas.width / 2

}

function draw() {
  background(220);

  buttRight.mousePressed(goRight) // right button listener
  buttLeft.mousePressed(goLeft) // left button listener

  slide()
  push();
  translate(camLoc.x, camLoc.y); // translates the view of your page (AKA the canvas) to the camLoc


  for (let i = 0; i < numOfPages; i++) {
    pages[i].run();
  }
  pop();
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
  if (-camLoc.x < 0) {
    camLoc.x = 0;
  }
  // checks if the camLoc is past the last page and set it to the loc of hte last page if it is.
  if (-camLoc.x > pages[pages.length - 1].loc.x) {
    timer = canvas.width / 2
    movingRight = false;
    movingLeft = false;
    camLoc.x = -pages[pages.length - 1].loc.x
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
    text("page #" + this.pageNum, this.loc.x + 100, this.loc.y + 100);


    // makes a box around the page
    line(this.loc.x, this.loc.y, this.loc.x + this.w, this.loc.y)
    line(this.loc.x, this.loc.y, this.loc.x, this.loc.y + this.h)
    line(this.loc.x, this.loc.y + this.h, this.loc.x + this.w, this.loc.y + this.h)
    line(this.loc.x + this.w, this.loc.y, this.loc.x + this.w, this.h)
  }
}