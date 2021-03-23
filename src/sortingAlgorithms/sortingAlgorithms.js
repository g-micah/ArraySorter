function swap(arr, leftIndex, rightIndex){
  var temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
}

//============================== BUBBLE SORT ===============================

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
  const animations = [];
  let len = arr.length;
  let sortedIndex = len;
  let swapped;
  if (len === 1){
    animations.push([0, 0, false, false]);
    return animations;
  } 


  do {
    swapped = false;
      for (let j = 0; j < sortedIndex; j++) {
        if (j === (sortedIndex-1)) {
          animations.push([j, j, false, true]);
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

//============================== QUICK SORT ===============================

function partition(arr, start, end){
  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start; 
  for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
      }
  }
  
  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
  return pivotIndex;
};

export const quickSort = (arr) => {
  // Creating an array that we'll use as a stack, using the push() and pop() functions
  const stack = [];
      
  // Adding the entire initial array as an "unsorted subarray"
  stack.push(0);
  stack.push(arr.length - 1);

  // There isn't an explicit peek() function
  // The loop repeats as long as we have unsorted subarrays
  while(stack[stack.length - 1] >= 0){
      
      // Extracting the top unsorted subarray
      let end = stack.pop();
      let start = stack.pop();
      
      let pivotIndex = partition(arr, start, end);
      
      // If there are unsorted elements to the "left" of the pivot,
      // we add that subarray to the stack so we can sort it later
      if (pivotIndex - 1 > start){
        stack.push(start);
        stack.push(pivotIndex - 1);
      }
      
      // If there are unsorted elements to the "right" of the pivot,
      // we add that subarray to the stack so we can sort it later
      if (pivotIndex + 1 < end){
        stack.push(pivotIndex + 1);
        stack.push(end);
      }
  }
  return arr;
};


export function getQuickSortAnimations(arr) {
  const animations = [];
  let len = arr.length;
  let sortedIndex = len;
  let swapped;
  if (len === 1){
    animations.push([0, 0, false, false]);
    return animations;
  } 



  

  return animations;
}


//=========================== MERGE SORT ===========================
export function getMergeSortAnimations(arr) {
  const animations = [];


  return animations;
}



//=========================== HEAP SORT ===========================
export function getHeapSortAnimations(arr) {
  const animations = [];


  return animations;
}



//=========================== INSERTION SORT ===========================
export function getInsertionSortAnimations(arr) {
  const animations = [];


  return animations;
}