// Grid Based Game (Minesweeper)
// Arman Borhan
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// To-Do: make it so the number of bombs = 10% of the squares on the grid,
// auto fill, detonation sequence, make white tiles display number of nearby bombs

let array;
let sqWidth = 50;
let numHeight, numWidth;
let bombCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numWidth =  floor(width/sqWidth);
  numHeight = floor(height/sqWidth);

  array = createGrid(numHeight, numWidth);
  for (let i=0; i<array.length; i++) {
    for (let j=0; j<array[i].length; j++) {
      if (array[i][j] === 2) {
        bombCount++;
      }
    }
  }
  console.log(bombCount);
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
      board[y].push(floor(random(2, 10)));
    }
  }
  return board;
}

function displayArray() {
  for (let y=0; y<numHeight; y++) {
    for (let x=0; x<numWidth; x++) {
      if (array[y][x] === 1) {
       fill(255);
      } else if (array[y][x] === 10) {
        fill("red");
      } else {
        fill(220);
      }
      rect(x*sqWidth, y*sqWidth, sqWidth, sqWidth);
    }
  }
}

function mousePressed() {
  let sqX = floor(mouseX/sqWidth);
  let sqY = floor(mouseY/sqWidth);

  if (array[sqY][sqX] !== 2 && array[sqY][sqX] !== 10) { 
    array[sqY][sqX] = 1;
  }
  else if (array[sqY][sqX] === 2) {
    array[sqY][sqX] = 10; //activated bomb

    //add lose code here
  }
}