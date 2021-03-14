function swap(arr, leftIndex, rightIndex){
  var temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
}

export const bubbleSort = (arr) => {
  let len = arr.length;
  if (len === 1) return arr;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j+1);
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
        if (j === (sortedIndex-1)) {
          animations.push([j, j+1, false, true]);
          sortedIndex = sortedIndex-1;
        } else {
          animations.push([j, j+1, false, false]);
          if (arr[j] > arr[j + 1]) {
            animations.push([j, j+1, true, false]);
            animations.push([j, j+1, false, false]);
            swap(arr, j, j+1);
            swapped = true;
          }
        }
      }
  } while(swapped)

  return animations;
}


function partition(arr, left, right) {
  var pivot   = arr[Math.floor((right + left) / 2)], //middle element
      i       = left, //left pointer
      j       = right; //right pointer
  while (i <= j) {
      while (arr[i] < pivot) {
          i++;
      }
      while (arr[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(arr, i, j); //sawpping two elements
          i++;
          j--;
      }
  }
  return i;
}

export const quickSort = (arr, left, right) => {
  var index;
  if (arr.length > 1) {
      index = partition(arr, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSort(arr, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSort(arr, index, right);
      }
  }
  return arr;
};