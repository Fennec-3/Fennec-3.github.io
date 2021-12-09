// Cicle Immersion

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(210);

  recursiveCircle(width/2, height);
}

function recursiveCircle(x, diameter) {
  circle(x, height/2, diameter);

  if (diameter > 50) {
    recursiveCircle(x-0.25*diameter, diameter/2);
    recursiveCircle(x+0.25*diameter, diameter/2);
  }
}