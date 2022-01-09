// Selection Sort

let someList = [5, 15, 3, 8, 9, 1, 20, 7];

function selectionSort(newList, oldList, w) {
  if (newList === oldList) {
    return newList;
  } else {
    oldList = newList;
  }

  let highNum = 0;
  let swapNum = newList.length-1-w;
  for (let i=0; i<newList.length-1; i++) {
    if (newList[i] > newList[highNum]) {
      highNum = i;
    } 
    if (i === swapNum) {
      let monke = newList[swapNum];
      newList[swapNum] = newList[highNum];
      newList[highNum] = monke;
      selectionSort(newList, oldList, w++);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(selectionSort(someList, [], 0));
}

function draw() {
  background(220);
}

function noRecursion() {
  // for (let x=0; x<someList.length; x++) {
  //   let highestNum = 0;
  //   for (let i=0; i<aList.length-1; i++) {
  //     let endPoint = aList.length-1;
  //     if (aList[i] > aList[highestNum]) {
  //       highestNum = i;
  //     }
  //     if (i === endPoint) {
  //       let monke = aList[endPoint];
  //       aList[endPoint] = aList[highestNum];
  //       aList[highestNum] = monke;
  //       endPoint--;
  //     }
  //   }
  // }
  // return aList;
}
