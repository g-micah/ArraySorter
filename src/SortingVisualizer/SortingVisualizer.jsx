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



        const javaScriptSortedArray = this.state.array.slice().sort((a,b) => a - b);
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
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

    }
    
    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <br />
                <button onClick={() => this.resetArray()}>Generate New Array</button>
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