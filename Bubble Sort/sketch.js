// Bubble Sort

let someList = [17, 8, 12, 4, 16, 3, 20, 11, 1];

function bubbleSort(aList) {
  let anySwaps = true;
  while(anySwaps) {
    anySwaps = false;

    for (let i=0; i<aList.length-1; i++) {
      if(aList[i] > aList[i+1]) {
        anySwaps = true;
        let monke = aList[i];
        aList[i] = aList[i+1];
        aList[i+1] = monke;
      }
    }
  }
  return aList;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(bubbleSort(someList));
}

function draw() {
  background(220);
}
