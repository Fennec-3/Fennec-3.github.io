// OOP Inheritance

let kar, plane, train;


function setup() {
  createCanvas(windowWidth, windowHeight);
  kar = new Car("Chevy Impala", 2006);
  plane = new Vehicle("boeing", "plane");

}

class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }
}

function draw() {
  background(220);
}


class Car extends Vehicle {
  constructor(name, age) {
    super(name, "car");
    this.name = name;
    this.age = age;
  }

  getName() {
    return "This car is a " + this.age + " " + super.getName();
  }
}