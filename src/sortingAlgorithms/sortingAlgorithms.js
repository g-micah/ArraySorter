/* 
  * Animation 3D array use:
  * [var1, var2, action]
  * 
  * action:
  *  - 0, highlight: Highlight both indexes
  *  - 1, doSwap:    Swap values at 2 var indexes
  *  - 2, isSorted:  Set index var1 through index var2 color to sorted
  *  - 3, insert:    Set value at index var1 equal to var2
  *  - 4, swapShift: Swap values at 2 var indexes then insert right value directly next to left value and shift
  */

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
    animations.push([0, 0, 0]);
    return animations;
  }

  do {
    swapped = false;
      for (let j = 0; j < sortedIndex; j++) {
        if (j === (sortedIndex-1)) {
          animations.push([j, j, 2]);
          sortedIndex = sortedIndex-1;
        } else {
          animations.push([j, j+1, 0]);
          if (arr[j] > arr[j + 1]) {
            animations.push([j, j+1, 1]);
            animations.push([j, j+1, 0]);
            swap(arr, j, j+1);
            swapped = true;
          }
        }
      }
  } while(swapped)

  return animations;
}

export function bubbleSortArray(arr) {
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
}


//============================== QUICK SORT ===============================
export function getQuickSortAnimations(arr) {
  const animations = [];
  let len = arr.length;
  if (len === 1){
    animations.push([0, 0, 0]);
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
        animations.push([start-1, pivotIndex, 2]);
      } else 
      {
        animations.push([pivotIndex-1, start, 2]);
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
        animations.push([pivotIndex, end+1, 2]);
      } else 
      {
        animations.push([end, pivotIndex+1, 2]);
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
    animations.push([i, end, 0]);
    if (arr[i] < pivotValue) {
      if(i !== pivotIndex)
      {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        animations.push([i, pivotIndex, 0]);
        animations.push([i, pivotIndex, 1]);
        animations.push([i, pivotIndex, 0]);
      }
      // Moving to next element
      pivotIndex++;
    }
  }
  
  // Putting the pivot value in the middle
  if(pivotIndex !== end) {
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    animations.push([pivotIndex, end, 0]);
    animations.push([pivotIndex, end, 1]);
    animations.push([pivotIndex, end, 0]);
  }
  
  return pivotIndex;
};

export function quickSortArray(arr) {
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
}




//=========================== MERGE SORT ===========================
export function getMergeSortAnimations(arr) {
  const animations = [];
  let len = arr.length;
  if (len <= 1){
    animations.push([0, 0, false, false]);
    return animations;
  } 

  mergeSort(arr, 0, true, animations);
  
  return animations;
}

export function mergeSort (arr, startingIdx, firstIteration, animations) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid), startingIdx, false, animations);
  let right = mergeSort(arr.slice(mid), (startingIdx+mid), false, animations);

  return merge(left, right, mid, startingIdx, firstIteration, animations);
}

const merge = (arr1, arr2, mid, startingIdx, firstIteration, animations) => {
  let sorted = [];
  let n = 0;
  let n2 = 0;

  while (arr1.length > 0 && arr2.length > 0) {
    animations.push([startingIdx+n, startingIdx+mid+n2, 0]);

    if (arr1[0] < arr2[0]) {

      sorted.push(arr1.shift());

    }
    else {
      animations.push([startingIdx+n, startingIdx+mid+n2, 4]);
      animations.push([startingIdx+n, startingIdx+mid+n2, 0]);

      sorted.push(arr2.shift());
      n2++;
    }
    if (firstIteration){
      animations.push([n, n, 2]);
    }
    n++;
  }
  return sorted.concat(arr1.slice().concat(arr2.slice()));
};


//=========================== HEAP SORT ===========================
export function getHeapSortAnimations(arr) {
  const animations = [];
  let len = arr.length;
  if (len === 1){
    animations.push([0, 0, false, false]);
    return animations;
  } 

  return animations;
}



//=========================== INSERTION SORT ===========================
export function getInsertionSortAnimations(arr) {
  const animations = [];
  let len = arr.length;
  if (len === 1){
    animations.push([0, 0, false, false]);
    return animations;
  } 

  return animations;
}