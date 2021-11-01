// Ball OOP Demo

let ballArray = [];
let theImage;

function preload() {
  theImage = loadImage("assets/JOJO.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<100; i++) {
    let x = random(100, width-100);
    let y = random(100, height-100);
    let theBall = new Ball(x, y, theImage);
    ballArray.push(theBall);
  }
}

function draw() {
  background(220);
  
  // theBall.move();
  // theBall.display();

  for (let i=0; i<ballArray.length; i++) {
    ballArray[i].move();
    ballArray[i].display();
  }
}

function mousePressed() {
  for (let i=ballArray.length-1; i>=0; i--) {
    if (ballArray[i].isPointInBall(mouseX, mouseY)) {
      ballArray.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === " ") {
    for (let i=0; i<1000; i++) {
      let theBall = new Ball(mouseX, mouseY, theImage);
      ballArray.push(theBall);
    }
  }   
}

class Ball {
  constructor(x, y, theImage) {
    this.radius = random(20, 50);
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.theColor = color(random(255), random(255), random(255), random(255));
    this.theImage = theImage;
  }

  display() {
    // noStroke();
    // fill(this.theColor);
    // circle(this.x, this.y, this.radius*2);

    imageMode(CENTER);
    image(this.theImage, this.x, this.y, this.radius*2, this.radius*2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
  }

  isPointInBall(x, y) {
    if (dist(x, y, this.x, this.y) < this.radius) {
      //inside ball
      return true;
    }
    else {
      return false;
    }
  }
}