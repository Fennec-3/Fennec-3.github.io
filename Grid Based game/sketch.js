// Grid Based Game (Minesweeper)
// Arman Borhan
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let array;
let sqWidth = 50;
let numHeight, numWidth;
let bombCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numWidth =  floor(width/sqWidth);
  numHeight = floor(height/sqWidth);

  array = createGrid(numHeight, numWidth);
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
        if (bombCount <= floor((numHeight*numWidth)/10)) {
          board[y].push(floor(random(10)));
          if (board[y][x] === 2) {
            bombCount++;
        }
      }
    }
  }
  return board;
}

function displayArray() {
  for (let y=0; y<numHeight; y++) {
    for (let x=0; x<numWidth; x++) {
      if (array[y][x] !== 2) {
       fill(220);
      } else if (array[y][x] === 1) {
        fill(255);
      } else if (array[y][x] === 10) {
        fill("red");
      }
      rect(x*sqWidth, y*sqWidth, sqWidth, sqWidth);
    }
  }
}

function mousePressed() {
  let sqX = floor(mouseX/sqWidth);
  let sqY = floor(mouseY/sqWidth);

  if (array[sqY][sqX] !== 2) { 
    array[sqY][sqX] = 1;
  }
  else if (array[sqY][sqX] === 2) {
    array[sqY][sqX] = 10; //activated bomb
  }
}