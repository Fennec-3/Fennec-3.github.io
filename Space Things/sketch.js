// Space Ship
// Arman Borhan
// 10/04/2021
//
// Extra for Experts:
// - I made it so you can change the ships color with the mouse wheel


let x, y, theta, colour, asteroid;
let speed = 3;
let score = 0;
let backColour = 0;
let dx = 10;
let dy = 8;
let radius = 40;
let by;
let bx;
let isDead = false;

function preload() {
  asteroid = loadImage("assets/asteroid.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  x = 50;
  y = height/2;
  theta = 0;
  bx = width/2;
  by = height/2;
}

function draw() {
  background(backColour, 30, 70);
  moveShip();
  boarder();
  displayShip();

  displayAsteroid();
  asteroidBounce();
  asteroidHit();
}

// This is how the ship is controled
function moveShip() {
  if (isDead === true) { //if asteroid hits ship, the ship stops moving
    speed = 0;
  }

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

// Ships appearance and location
function displayShip() {
  push();
  fill(colour, 20, 100);
  noStroke();
  translate(x, y);
  rotate(theta);
  triangle(15,0,-30,15,-30,-15);
  pop();
}

// Boarder to detect when ship crosses bounds
function boarder() {
  if (x > width) { //crossing right side sends ship to left
    x = 0;         //and increases score by 1
    score++;
  } else if (x < 0) { //won't allow ship to cross left side
    x = 5;
  } else if (y < 0) { //crossing top sends ship to bottom
    y = height - 5;
  } else if (y > height) { //crossing bottom sends ship to top
    y = 5;
  }
}

//mouse wheel randomizes ships color
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

//the asteroids looks and position
function displayAsteroid() {
  imageMode(CENTER);
  image(asteroid, bx, by, radius*2, radius*2);

  noStroke();
  noFill();
  circle(bx, by, radius*2);
}

function asteroidBounce() {
  if (isDead === true) { //if ship is hit the asteroid stops moving
    dx = 0;
    dy = 0;
    bx = width - (radius + 20);
    by = radius + 20;
  }

  bx += dx;
  by += dy;

  if (bx + radius >= width || bx - radius <= 0) { //makes asteroid bounce off left/right walls
    dx = -dx;
  } 
  if (by + radius >= height || by - radius <= 0) { //makes asteroid bounce off top/bottom walls
    dy = -dy;
  }
}

function asteroidHit() { //detects when ship has been hit by asteroid
  let distFromAsteroid = dist(x, y, bx, by);

  if (distFromAsteroid <= radius) { //displays a message to let you know that you failed
    isDead = true;                  //and then restarts the game
    alert("You died! Your score was: " + score);
    location.reload();
  }
}