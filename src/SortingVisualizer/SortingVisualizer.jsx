import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1000;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';



export default class SortingVisualizer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 580));
        }
        this.setState({array});
    }

    mergeSortOld(){
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array); 

        
    }

    
    mergeSort() {
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort(){

    }

    heapSort(){

    }

    bubbleSort(){

    }

    insertionSort(){

    }

    testSortingAlgorithm(){
        //Creates 100 arrays and checks each array for sorting against JavaScript sort
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = sortingAlgorithms.getMergeSortAnimations(array.slice());
            const quickSortedArray = sortingAlgorithms.quickSort(array.slice());
            const heapSortedArray = sortingAlgorithms.heapSort(array.slice());
            const bubbleSortedArray = sortingAlgorithms.bubbleSort(array.slice());
            const insertionSortedArray = sortingAlgorithms.insertionSort(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, insertionSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style=
                        {{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}
                    ></div>
                ))}
                <br />
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.testSortingAlgorithm()}>Check Sorting Algorithms</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>

            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]){
            return false;
        }
    }
    return true;
}