// Space Ship
// Arman Borhan
// 9/28/2021
//
// Extra for Experts:
// - I made it so you can change the ships color with the mouse wheel


let x, y, theta, colour, asteroid;
let speed = 3;
let backColour = 0;
let bx = width;
let by = height/2;
let dx = 15;
let dy = 10;
let radius = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  x = 50;
  y = height/2;
  theta = 0;
}

function draw() {
  background(backColour, 30, 70);
  moveShip();
  boarder();
  displayShip();

  displayAsteroid();
  asteroidBounce();
}

function preload() {
  asteroid = loadImage("assets/asteroid.png");
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

// Boarder to detect when ship crosses bounds
function boarder() {
  if (x > width) {
    x = 0;
  } else if (x < 0) {
    x = 5;
  } else if (y < 0) {
    y = height - 5;
  } else if (y > height) {
    y = 5;
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

// function keyPressed() {
//   if (key === 13) {
//     x = 10;
//     y = height/2;
//   }
// }

// all asteroid code below this
function displayAsteroid() {
  imageMode(CENTER);
  image(asteroid, bx, by, radius*2, radius*2);

  noStroke();
  noFill();
  circle(bx, by, radius*2);
}

function asteroidBounce() {
  bx += dx;
  by += dy;
  
  if (bx + radius >= width || bx - radius <= 0) {
    dx = -dx;
  } 
  if (by + radius >= width || by - radius <= 0) {
    dy = -dy;
  }
}