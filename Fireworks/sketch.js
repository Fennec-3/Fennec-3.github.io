// Fireworks OOP demo

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 30);

  for (let i=fireworks.length-1; i>=0; i--) {
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    } else {
      fireworks[i].move();
      fireworks[i].display();
    }
  }
}

function mousePressed() {
  for (let i=0; i<100; i++) {
    let myParticle = new Particle(mouseX, mouseY);
    fireworks.push(myParticle);
  }
}

function keyPressed() {
  if (key === " ") {
    for (let i=0; i<100; i++) {
      let myParticle = new Particle(width/2, height/2);
      fireworks.push(myParticle);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(3, 7);
    this.alpha = 255;
    this.color = "red";
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
  }

  move() {
    this.alpha--;
    this.color = color(255, 0, 0, this.alpha);

    this.x += this.dx;
    this.y += this.dy;
  }

  isDead() 
  {
    return this.alpha < 0;
  }
}

