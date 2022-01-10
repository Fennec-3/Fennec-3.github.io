// Selection Sort

let someList = [5, 15, 3, 8, 9, 1, 20, 7];

// function selectionSort(newList, oldList, w) {
//   if (newList === oldList) {
//     return newList;
//   } else {
//     oldList = newList;
//   }

//   let highNum = 0;
//   let swapNum = newList.length-1-w;
//   for (let i=0; i<newList.length-1; i++) {
//     if (newList[i] > newList[highNum]) {
//       highNum = i;
//     } 
//     if (i === swapNum) {
//       let monke = newList[swapNum];
//       newList[swapNum] = newList[highNum];
//       newList[highNum] = monke;
//       selectionSort(newList, oldList, w++);
//     }
//   }
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(noRecursion(someList));
}

function draw() {
  background(220);
}

function noRecursion(aList) {
  let swapLocation = aList.length-1;

  while(swapLocation > 0) {
    let highestLocation = 0;

    //one pass
    for (let current=0; current<=swapLocation; current++) {
      if (aList[current] > aList[highestLocation]) {
        highestLocation = current;
      }
    }

    //swap
    let monke = aList[swapLocation];
    aList[swapLocation] = aList[highestLocation];
    aList[highestLocation] = monke;
    swapLocation--;
    console.log(aList);
  }
  return aList;
}
