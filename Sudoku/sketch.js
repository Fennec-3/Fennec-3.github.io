// Sudoku

let initialGrid = [
  [2, 0, 5, 0, 0, 7, 0, 0, 6],
  [4, 0, 0, 9, 6, 0, 0, 2, 0],
  [0, 0, 0, 0, 8, 0, 0, 4, 5],
  [9, 8, 0, 0, 7, 4, 0, 0, 0],
  [5, 7, 0, 8, 0, 2, 0, 6, 9],
  [0, 0, 0, 6, 3, 0, 0, 5, 7],
  [7, 5, 0, 0, 2, 0, 0, 0, 0],
  [0, 6, 0, 0, 5, 1, 0, 0, 2],
  [3, 0, 0, 4, 0, 0, 5, 0, 8],
];

let gridDimensions = 9;
let cellSize;
let grid;

function setup() {
  if (windowWidth<windowHeight) {
    createCanvas(windowWidth*0.8, windowWidth*0.8);
  } else {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
  }
  cellSize = (width-2)/gridDimensions;
  grid = initialGrid;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      fill("white");
      strokeWeight(1);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

      if (grid[y][x] !== 0) {
        fill("black");
        textSize(cellSize*0.75);
        textAlign(CENTER, CENTER);
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);
      }
    }
  }
  drawCageLines();
}

function drawCageLines() {
  for (let i=0; i<=9; i+=3) {
    strokeWeight(4);
    line(0, cellSize*i, width, cellSize*i);
    line(cellSize*i, 0, cellSize*i, height);
  }
}