export const bubbleSort = (arr) => {
  let len = arr.length;
  if (len === 1) return arr;
  const sortedArray = [];

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};

export function getBubbleSortAnimations(arr) {
  let len = arr.length;
  let sortedIndex = len;
  let swapped;
  if (len === 1) return arr;
  const animations = [];

  do {
    swapped = false;
      for (let j = 0; j < sortedIndex; j++) {
        animations.push([j, j+1, true]);
        if (arr[j] > arr[j + 1]) {
          animations.push([j, j+1, false]);
          animations.push([j, j+1, true]);
          
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          swapped = true;
        }
        
        /*
        if (j === sortedIndex - 1) {
          
        }
        */


      }
  } while(swapped)

  return animations;
}


/*
let bubbleSort = (inputArr) => {
  let len = inputArr.length;
  let swapped;
  do {
      swapped = false;
      for (let i = 0; i < len; i++) {
          if (inputArr[i] > inputArr[i + 1]) {
              let tmp = inputArr[i];
              inputArr[i] = inputArr[i + 1];
              inputArr[i + 1] = tmp;
              swapped = true;
          }
      }
  } while (swapped);
  return inputArr;
};
*/




















/*
let bubbleSort = (inputArr) => {
    let len = inputArr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return inputArr;
};
*/





/*
export const mergeSort = (array) => {
    if (array.length === 1) return array;
    const middleIdx = Math.floor(array.length / 2);
    const firstHalf = mergeSort(array.slice(0, middleIdx));
    const secondHalf = mergeSort(array.slice(middleIdx));
    const sortedArray = [];
    let i = 0,
        j = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        if(firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++]);
        }
    }
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray;
};
*/


export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}





export const quickSort = array => {
  const animations = [];
  if (array.length === 1) return array;
  const sortedArray = [];



  return sortedArray;
};


function quickSortHelper(low, high)
{


};


export const heapSort = array => {
  if (array.length === 1) return array;
  const sortedArray = [];

  return sortedArray;
};

export const insertionSort = array => {
  if (array.length === 1) return array;
  const sortedArray = [];

  return sortedArray;
};