// Space Tag
// Arman Borhan
// 9/28/2021
//
// Extra for Experts:
// - I made it so you can change the ships color with the mouse wheel


let x, y, theta, colour;
let speed = 3;
let backColour = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  x = width/3;
  y = height/3;
  theta = 0;
}

function draw() {
  background(backColour, 30, 70);
  moveShip();
  boarder();
  displayShip();
}

// This is how the ship is controled
function moveShip() {
  if (keyIsDown(68)) { //d turns ship right
    theta += 5;
  }
  if (keyIsDown(65)) { //a turns ship left
    theta -= 5;
    x += cos(theta) * speed;
    y += sin(theta) * speed;
  }
  else {
    x += cos(theta) * speed;
    y += sin(theta) * speed;
  }
  if (keyIsDown(32)) { // spacebar boosts ships speed
    speed = 6;
  } else {
    speed = 3;
  }
}

// Boarder to stop ship from going out of bounds
function boarder() {
  if (x < 0 || y < 0 || x > width || y > height) {
    // add "you died" text here
    noLoop();
  }
}

// Ships appearance and location
function displayShip() {
  fill(colour, 20, 100);
  noStroke();
  translate(x, y);
  rotate(theta);
  triangle(15,0,-30,15,-30,-15);
}

//randomizes ships color
function mouseWheel(event) {
  colour = random(1, 360);
}

// Changes background colour with each click of the mouse
function mouseClicked() {
  backColour = backColour + 20;
  if (backColour > 360) {
    backColour = 0;
  }
}

function keyPressed() {
  if (key === 13) {
    x = width/3;
    y = height/3;
    loop();
  }
}