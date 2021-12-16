

let fish;
let clownImg;
let cambyStore, propHat;

function preload() {
  clownImg = loadImage("assets/Bem Shaponjo.png");
  cambyStore = loadImage("assets/candyStore.png");
  propHat = loadImage("assets/prophat.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  propHat.resizeNN(200, 200);

  fish = new Clown(width/10, random(height), 30, propHat);
  clown = new Clown(width/10, fish.y+90, 50, clownImg);
}

function draw() {
  image(cambyStore, 0, 0, width, height);
  clown.update();
  clown.display();
  fish.update();
  fish.display();
}

class Creature {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  update() {
    this.x += 4;
  }

  display() {
    fill("green");
    circle(this.x, this.y, this.size);
  }
}

class Clown extends Creature {
  constructor(x, y, size, theImg) {
    super(x, y, size);
    this.theImg = theImg;
  }

  display() {
    image(this.theImg, this.x, this.y);
  }
}