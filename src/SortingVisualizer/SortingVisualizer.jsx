import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

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
        for (let i = 0; i < 310; i++) {
            array.push(randomIntFromInterval(5, 580));
        }
        this.setState({array});
    }

    mergeSort(){
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array); 

        
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
            const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
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
                        style={{height: `${value}px`}}
                    >
                    </div>
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
        //<button onClick={() => this.testSortingAlgorithm()}>Check Sorting Algorithms</button>
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