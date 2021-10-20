// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let array;
let sqWidth = 50;
let numHeight, numWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numWidth =  floor(width/sqWidth);
  numHeight = floor(height/sqWidth);

  array = createGrid();
  console.log(array);
}

function draw() {
  background(255);
  displayArray();
}

function createGrid(numHeight, numWidth) {
  let board = [];
  for (let y=0; y<numHeight; y++) {
    board.push([]);
    for (let x=0; x<numWidth; x++) {
      board[y].push(0);
    }
  }
  return board;
}

function displayArray() {
  for (let y=0; y<numHeight; y++) {
    for (let x=0; x<numWidth; x++) {
      if (array[y][x] === 0) {
       fill(240);
      } else {
        fill(255);
      }
      rect(x*sqWidth, y*sqWidth, sqWidth, sqWidth);
    }
  }
}