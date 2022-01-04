// Bubble Sort

let someList = [5, 15, 3, 8, 9, 1, 20, 7];

function bubbleSort(aList) {
  for (let i=0; i<aList.length; i++) {
    if(aList[i] > aList[i+1]) {
      let monke = aList[i];
      aList[i] = aList[i+1];
      aList[i+1] = monke;
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
