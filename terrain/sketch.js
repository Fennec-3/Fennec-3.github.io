// Terrain

let rectHeights = [];
let numOfRects;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numOfRects = width;
  generateTerrain();
}

function draw() {
  background(220);
  displayTerrain();
}

function displayTerrain() {
  let theWidth = width/rectHeights.length;
  for (let i=0; i<rectHeights.length; i++) {
    let theHeight = rectHeights[i];
    fill("black");
    rect(theWidth*i, height, 10, -theHeight);
  }
}

function generateTerrain() {
  let time = 0;
  for (let i = 0; i<numOfRects; i++) {
    let theHeight = noise(time) *height;
    rectHeights.push(theHeight);
    time += 0.0015;
  }
}