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
let bombCount, resetTimer, isDead;

function setup() { //creates array, and sets all variables (setup is called when game resets)
  createCanvas(windowWidth, windowHeight);
  isDead = false;
  numWidth =  floor(width/sqWidth);
  numHeight = floor(height/sqWidth);
  array = createGrid(numHeight, numWidth); 

  bombCount = 0; //counts how many bombs are in the array and displays in console
  for (let i=0; i<array.length; i++) {
    for (let j=0; j<array[i].length; j++) {
      if (array[i][j] === 2) {
        bombCount++;
      }
    }
  }
  console.log(bombCount);
}

function draw() {
  background(255);
  displayArray();

  if (isDead === true) { //once bomb has been activated this code lets players know they have lost
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(100);
    text("You Died", width/2, height/2);
    if (millis() > resetTimer + 5000) { //resets after 5 seconds
      setup();
    }
  }
}

function createGrid(numHeight, numWidth) {
  let board = [];
  for (let y=0; y<numHeight; y++) { //creates array
    board.push([]);
    for (let x=0; x<numWidth; x++) {
      board[y].push(floor(random(1, 10))); //randomizes tiles. dormant bombs = 9, activated bombs = 10, everything else is plain
    }
  }
  newArray = createNewGrid(board); //stores nearbombs count in the replica array
  for (let i=0; i<newArray.length; i++) {
    for (let j=0; j<newArray[i].length; j++) {
      newArray[i][j] = checkBombs(board, i, j);
    }
  }
  return board;
}

function createNewGrid(array) { //creates replica of array
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
  for (let y=0; y<numHeight; y++) { //checks array colors mined spaces white, bombs red, and unmined spaces gray
    for (let x=0; x<numWidth; x++) {
      if (array[y][x] === 0) { 
       fill(255);
      } else if (array[y][x] === 10) { 
        fill("red");
      } else {
        fill("green");
      }
      rect(x*sqWidth, y*sqWidth, sqWidth, sqWidth);
      if (array[y][x] === 0 && newArray[y][x] !== 0) { //displays grid and nearby bombs of mined tiles
        displayText(y, x);
      }
    }
  }
}

function mousePressed() {
  let sqX = floor(mouseX/sqWidth);
  let sqY = floor(mouseY/sqWidth);

  if (array[sqY][sqX] !== 9 && array[sqY][sqX] !== 10) { //mines spot if there are no mines
    array[sqY][sqX] = 0;
    
    array = floodFill(array, sqX, sqY); //flood fill
  }
  else if (array[sqY][sqX] === 9) {
    array[sqY][sqX] = 10; //activates bomb

    for (let i=0; i<array.length; i++) { //nested for loop will reveal all bomb locations when bomb is activated
      for (let j=0; j<array[i].length; j++) {
        if (array[i][j] === 9) {
          array[i][j] = 10;
        }
      }
    }
    isDead = true;
    resetTimer = millis(); //resets game after player dies
  }
}

function displayText(y, x) { //displays nearby bombs
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

function floodFill(floodArray, x, y) {
  if (newArray[y][x] === 0) {
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (x-j >= 0 && x-j < numWidth && y-i >= 0 && y-i < numHeight) {
          if (floodArray[y-i][x-j] !== 9 || floodArray[y-i][x-j] !== 10) {
            floodArray[y-i][x-j] = 0;
            floodArray = flowFill(floodArray, x-j, y-i);
          }
        }
      }
    }
  }
  return floodArray;
}

function flowFill(flowArray, x, y) {
  if (newArray[y][x] === 0) {
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (x-j >= 0 && x-j < numWidth && y-i >= 0 && y-i < numHeight) {
          if (flowArray[y-i][x-j] !== 9 || flowArray[y-i][x-j] !== 10) {
            flowArray[y-i][x-j] = 0;
          }
        }
      }
    }
  }
  return flowArray;
}