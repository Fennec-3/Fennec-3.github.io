// Grid Based Game (Minesweeper)
// Arman Borhan
// 2021-11-06
//
// Extra for Experts:
// - Attempted flood fill (not perfected. You might need to tap blank white spaces to continue the flood)

let array, neighborArray, flagArray;
let squareWidth = 50;
let verticalCellsInGrid, numWidth;
let resetTimer, isDead;

function setup() { //creates array, and sets all variables (setup is called when game resets)
  createCanvas(windowWidth, windowHeight);
  isDead = false;
  numWidth =  floor(width/squareWidth);
  verticalCellsInGrid = floor(height/squareWidth);
  array = createGrid(verticalCellsInGrid, numWidth); 
}

function draw() {
  background(255);
  displayArray();

  if (isDead) { //lets players know if they have lost
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(100);
    text("You Died!", width/2, height/2);
    reset();
  }

  if (hasWon()) { //lets player know if they've won
    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(100);
    text("You Won!", width/2, height/2);
    reset();
  }
}

function createGrid(numHeight, numWidth) { //creates three arrays
  let board = [];
  for (let y=0; y<numHeight; y++) {
    board.push([]);
    for (let x=0; x<numWidth; x++) {
      board[y].push(floor(random(1, 10))); //randomizes tiles. dormant bombs = 9, activated bombs = 10, everything else is plain
    }
  }

  neighborArray = createReplicaGrid(board); //stores nearbombs count in the replica array
  for (let i=0; i<neighborArray.length; i++) {
    for (let j=0; j<neighborArray[i].length; j++) {
      neighborArray[i][j] = checkBombs(board, i, j);
    }
  }

  flagArray = createReplicaGrid(board); //stores flag locations
  return board;
}

function createReplicaGrid(array) { //creates replica of array
  let array2 = [];

  for (let y=0; y<verticalCellsInGrid; y++) {
    array2.push([]);
    for (let x=0; x<numWidth; x++) {
      array2[y].push(array[y][x]);
    }
  }
  return array2;
}

function displayArray() {
  for (let y=0; y<verticalCellsInGrid; y++) { //colors mined spaces white, bombs red, and unmined spaces green
    for (let x=0; x<numWidth; x++) {
      if (array[y][x] === 0) { 
       fill(255);
      } else if (array[y][x] === 10) { 
        fill("red");
      } else {
        fill(117, 214, 13);
      }
      rect(x*squareWidth, y*squareWidth, squareWidth, squareWidth);
      if (array[y][x] === 0 && neighborArray[y][x] !== 0) { //displays grid and nearby bombs of mined tiles
        displayCellText(y, x);
      }
      if (array[y][x] !== 0 && flagArray[y][x] === "flag") { //blue circles mark flaged cells
        fill("blue");
        circle(x*squareWidth+squareWidth/2, y*squareWidth+squareWidth/2, squareWidth);
      }
    }
  }
}

function mousePressed() { //mines clicked cells
  let squareX = floor(mouseX/squareWidth);
  let squareY = floor(mouseY/squareWidth);

  if (array[squareY][squareX] !== 9 && array[squareY][squareX] !== 10 && flagArray[squareY][squareX] !== "flag") { //mines cell if there is no flag on it
    array[squareY][squareX] = 0;
    array = floodFill(array, squareX, squareY); //flood fill
    resetTimer = millis();
  }

  else if (array[squareY][squareX] === 9 && flagArray[squareY][squareX] !== "flag") { //activates bomb
    array[squareY][squareX] = 10; 

    for (let i=0; i<array.length; i++) { //reveals all bomb locations
      for (let j=0; j<array[i].length; j++) {
        if (array[i][j] === 9) {
          array[i][j] = 10;
        }
      }
    }
    isDead = true; 
    resetTimer = millis();
  }
}

function keyPressed() { //places a flag on a cell
  let sqX = floor(mouseX/squareWidth);
  let sqY = floor(mouseY/squareWidth);

  if (flagArray[sqY][sqX] !== "flag") {
    flagArray[sqY][sqX] = "flag";
  } else {
    flagArray[sqY][sqX] = "blank";
  }
}

function hasWon() { //checks if all non-bomb cells have been mined (win condition)
  for (let y=0; y<array.length; y++) {
    for (let x=0; x<array[y].length; x++) {
      if (array[y][x] !== 9 && array[y][x] !== 0) {
        return false;
      }
    }
  }
  return true;
}

function reset() { //resets games
  if (millis() > resetTimer + 5000) {
    setup();
  }
}

function displayCellText(y, x) { //displays number of nearby bombs
  fill("black");
  textSize(squareWidth*0.5);
  textAlign(CENTER, CENTER);
  text(neighborArray[y][x], x*squareWidth + squareWidth/2, y*squareWidth + squareWidth/2);    
}

function checkBombs(board, y, x) { //checks how many bombs surround a cell
  let nearBombs = 0;

    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (x-j >= 0 && x-j < numWidth && y-i >= 0 && y-i < verticalCellsInGrid) {
          if (board[y-i][x-j] === 9 || board[y-i][x-j] === 10) {
            nearBombs++;
          }
        }
      }
    }
  return nearBombs;
}

function floodFill(floodArray, x, y) { //clears cells around cells that don't have nearby bombs
  if (neighborArray[y][x] === 0) {
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (x-j >= 0 && x-j < numWidth && y-i >= 0 && y-i < verticalCellsInGrid) {
          if (floodArray[y-i][x-j] !== 9 || floodArray[y-i][x-j] !== 10) {
            floodArray[y-i][x-j] = 0;
            for (let z=-3; z<3; z++) {
              if (x-j-z >= 0 && x-j-z < numWidth && y-i-z >= 0 && y-i-z < verticalCellsInGrid) {
                floodArray = flowFill(floodArray, x-j-z, y-i-z);
              }
            }
          }
        }
      }
    }
  }
  return floodArray;
}

function flowFill(flowArray, x, y) { //does the same as floodFill, but I can call this
  if (neighborArray[y][x] === 0) { //within floodFill without javaScript screaming in my ear
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (x-j >= 0 && x-j < numWidth && y-i >= 0 && y-i < verticalCellsInGrid) {
          if (flowArray[y-i][x-j] !== 9 || flowArray[y-i][x-j] !== 10) {
            flowArray[y-i][x-j] = 0;
          }
        }
      }
    }
  }
  return flowArray;
}