//Grid Images Demo

let gridSize = 50;
let grid;
let clickSound;
let brickImg;
let dirtImg;

function preload() {
  clickSound = loadSound("assets/Bruh_Sound_Effect_345.mp3");
  brickImg = loadImage("assets/Bricks.JPG");
  dirtImg = loadImage("assets/Dirt.JPG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridSize, gridSize);
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "e") {
    grid = createEmpty2DArray(gridSize, gridSize);
  }
  if (key === "b") {
    grid = createEmpty2DArray(gridSize, gridSize, 1);
  }
  if (key === "r") {
    grid = createRandom2DArray(gridSize, gridSize);
  }
}

function mousePressed() {
  clickSound.play();

  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;

  let cellX = Math.floor(mouseX/cellWidth);
  let cellY = Math.floor(mouseY/cellHeight);

  swap(cellX, cellY);
  swap(cellX+1, cellY);
  swap(cellX-1, cellY);
  swap(cellX, cellY+1);
  swap(cellX, cellY-1);
}

function swap(x, y) {
  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}

function displayGrid() {
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;

  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
        if(grid[y][x]===0) {
          image(brickImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        } else if (grid[y][x]===1) {
          image(dirtImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        }
    }
  }
}

function createEmpty2DArray(rows, cols, numToFill = 0) {
  let grid = [];
  for (let y=0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      // if (random(100) < 50) {
      //   grid[y].push(0);
      // } else {
      //   grid[y].push(1);
      // }
      grid[y].push(0);
    }
  }
  return grid;
}

function createRandom2DArray(rows, cols) {
  let grid = [];
  for (let y=0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      if (random(100) < 50) {
        grid[y].push(0);
      } else {
        grid[y].push(1);
      }
      // grid[y].push(0);
    }
  }
  return grid;
}