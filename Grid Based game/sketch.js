// Grid Based Game (Minesweeper)
// Arman Borhan
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// To-Do: make it so the number of bombs = 10% of the squares on the grid // Done?

// flood fill(2), detonation sequence(1), first click safety (3)(maybe)

let array, newArray;
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
      board[y].push(floor(random(1, 10)));
    }
  }
  newArray = createNewGrid(board);
  console.log(newArray);
  for (let i=0; i<newArray.length; i++) {
    for (let j=0; j<newArray[i].length; j++) {
      newArray[i][j] = checkBombs(board, i, j);
    }
  }
  return board;
}

function createNewGrid(array) {
  let array2 = [];

  for (let y=0; y<numHeight; y++) {
    array2.push([]);
    for (let x=0; x<numWidth; x++) {
      array2[y].push(array[y][x]);
    }
  }
  return array2;
}

function displayArray() {
  for (let y=0; y<numHeight; y++) {
    for (let x=0; x<numWidth; x++) {
      if (array[y][x] === 0) {
       fill(255);
      } else if (array[y][x] === 10) {
        fill("red");
      } else {
        fill(220);
      }
      rect(x*sqWidth, y*sqWidth, sqWidth, sqWidth);
      if (array[y][x] === 0 && newArray[y][x] !== 0) {
        displayText(y, x);
      }
    }
  }
}

function mousePressed() {
  let sqX = floor(mouseX/sqWidth);
  let sqY = floor(mouseY/sqWidth);

  if (array[sqY][sqX] !== 9 && array[sqY][sqX] !== 10) { 
    array[sqY][sqX] = 0;
    // newArray code and flood fill code go here
  }
  else if (array[sqY][sqX] === 9) {
    array[sqY][sqX] = 10; //activated bomb

    //add detonation code here
  }
}

function displayText(y, x) {
  fill("black");
  textSize(sqWidth*0.5);
  textAlign(CENTER, CENTER);
  text(newArray[y][x], x*sqWidth + sqWidth/2, y*sqWidth + sqWidth/2);    
}

function checkBombs(board, y, x) {
  let nearBombs = 0;

    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (x-j >= 0 && x-j < numWidth && y-i >= 0 && y-i < numHeight) {
          if (board[y-i][x-j] === 9 || board[y-i][x-j] === 10) {
            nearBombs++;
          }
        }
      }
    }
  return nearBombs;
}