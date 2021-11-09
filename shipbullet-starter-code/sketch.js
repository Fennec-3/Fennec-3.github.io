// OOP Pair Programming Starter Code
// Arman and Declan
// 11/9/2021


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width / 2, height / 2, shipImage);
}

function draw() {
  background(0);
  enterprise.update();
  enterprise.display();
}

function keyPressed() {
  enterprise.handleKeyPress();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.image = theImage;
    this.speed = 5;

    this.bullet = new Bullet(-1000, -1000, 0, 0, bulletImage);
    this.bulletArray = [];
  }

  update() {
    // move ship -- you might want to use the keyIsDown() function here
    if (keyIsDown(87)) { //w
      this.y -= this.speed;
    }
    if (keyIsDown(83)) { //s
      this.y += this.speed;
    }
    if (keyIsDown(65)) { //a
      this.x -= this.speed;
    }
    if (keyIsDown(68)) { //d
      this.x += this.speed;
    }
    

    // if doing extra for experts, show bullet(s)
    for (let i = this.bulletArray.length-1; i >= 0; i--) {
      this.bulletArray[i].update();
      this.bulletArray[i].display();

      if (!this.bulletArray[i].isOnScreen()) {
        this.bulletArray.splice(i, 1);
      }
    }
  }

  display() {
    imageMode(CENTER);

    image(this.image, this.x, this.y);
  }

  handleKeyPress() {
    // you only need to use this if you are doing the extra for experts...
    // if you are, you should make a bullet if the space key was pressed

    if (keyIsDown(32)) {
      this.bullet = new Bullet(this.x, this.y, 0, -10, bulletImage);
      this.bulletArray.push(this.bullet);
    }
  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.image = theImage;
  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.y += this.dy;
  }

  display() {
    imageMode(CENTER);

    image(this.image, this.x, this.y);
  }

  isOnScreen() {
    return this.y <= height && this.y >= 0 && this.x <= width && this.x >= 0;
  }
}

