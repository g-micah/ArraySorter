function swap(arr, leftIndex, rightIndex){
  var temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
}


//============================== BUBBLE SORT ===============================
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


//============================== QUICK SORT ===============================
export function getQuickSortAnimations(arr) {
  const animations = [];
  let len = arr.length;
  if (len === 1){
    animations.push([0, 0, false, false]);
    return animations;
  } 
  let end = 0;
  let start = 0;
  let pivotIndex = 0;

  const stack = [];

  // Adding the entire initial array as an "unsorted subarray"
  stack.push(0);
  stack.push(len - 1);

  // There isn't an explicit peek() function
  // The loop repeats as long as we have unsorted subarrays
  while(stack[stack.length - 1] >= 0){
      
    // Extracting the top unsorted subarray
    end = stack.pop();
    start = stack.pop();
    
    pivotIndex = partition(arr, start, end, animations);
    
    // If there are unsorted elements to the "left" of the pivot,
    // we add that subarray to the stack so we can sort it later
    if (pivotIndex - 1 > start){
      stack.push(start);
      stack.push(pivotIndex - 1);
    } else {
      if (pivotIndex > start)
      {
        animations.push([start-1, pivotIndex, false, true]);
      } else 
      {
        animations.push([pivotIndex-1, start, false, true]);
      }
    }
    
    // If there are unsorted elements to the "right" of the pivot,
    // we add that subarray to the stack so we can sort it later
    if (pivotIndex + 1 < end){
      stack.push(pivotIndex + 1);
      stack.push(end);
    } 
    else {
      if (pivotIndex < end)
      {
        animations.push([pivotIndex, end+1, false, true]);
      } else 
      {
        animations.push([end, pivotIndex+1, false, true]);
      }
    }
}

  

  return animations;
}

function partition(arr, start, end, animations){
  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start; 
  for (let i = start; i < end; i++) {
    animations.push([i, end, false, false]);
    if (arr[i] < pivotValue) {
      if(i !== pivotIndex)
      {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        animations.push([i, pivotIndex, false, false]);
        animations.push([i, pivotIndex, true, false]);
        animations.push([i, pivotIndex, false, false]);
      }
      // Moving to next element
      pivotIndex++;
    }
  }
  
  // Putting the pivot value in the middle
  if(pivotIndex !== end) {
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    animations.push([pivotIndex, end, false, false]);
    animations.push([pivotIndex, end, true, false]);
    animations.push([pivotIndex, end, false, false]);
  }
  
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
      
      let pivotIndex = partition(arr, start, end, []);
      
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