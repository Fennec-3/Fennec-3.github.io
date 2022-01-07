// Selection Sort

let someList = [5, 15, 3, 8, 9, 1, 20, 7];

function selectionSort(aList) {
  for (let x=0; x<someList.length; x++) {
    let highestNum = 0;
    for (let i=0; i<aList.length-1; i++) {
      let endPoint = aList.length-1;
      if (aList[i] > aList[highestNum]) {
        highestNum = i;
      }
      if (i === endPoint) {
        let monke = aList[endPoint];
        aList[endPoint] = aList[highestNum];
        aList[highestNum] = monke;
        endPoint--;
      }
    }
  }
  return aList;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(selectionSort(someList));
}

function draw() {
  background(220);
}
