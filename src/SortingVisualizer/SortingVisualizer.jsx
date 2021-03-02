import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import './bootstrap.css';


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 200;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const UNSORTED_COLOR = 'lightblue';

const SORTED_COLOR = 'rgb(145, 170, 178)';

// This is the color of array bars that are being compared throughout the animations.
const SELECTED_COLOR = 'rgb(255, 235, 55)';

const SWAP_COLOR = 'rgb(255, 27, 27)';


export default class SortingVisualizer extends React.Component {
    constructor (props) {
        super(props);
        this.timer = null;

        this.state = {
            array: [],
            sorting: false
        };
    }
    timer;
    width;

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        //End current sorting animation
        this.cancelCurrentSort();
        //Create new array and update visual
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(30, 800));
        }
        this.width = (100 / NUMBER_OF_ARRAY_BARS) - (0.22*NUMBER_OF_ARRAY_BARS);
        this.setState({array});
        //Clear all bars color
        this.clearBarsColor();
        //Enable sorting buttons
        this.sortingButtonsEnabled(true);
    }

    cancelCurrentSort() {
        this.timer++;
        while(this.timer--)
        {
            clearTimeout(this.timer);
            console.log(true);
        }
    }

    //clear all bars color
    clearBarsColor() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let x = 0; x < arrayBars.length; x++) {
            arrayBars[x].style.backgroundColor = UNSORTED_COLOR;
        }
    }

    sortingButtonsEnabled(value)
    {
        const sortButtons = document.getElementsByClassName('sort-button');
        for (let i = 0; i < sortButtons.length; i++)
        {
            sortButtons[i].disabled = !value;
        }
    }

    sort(type){
        //Clear all bars color
        this.clearBarsColor();
        //Disable buttoms
        this.sortingButtonsEnabled(false);

        switch(type)
        {
            case "bubble":
                this.bubbleSort();
                break;
            case "merge":
                this.mergeSort();
                break;
            case "quick":
                this.quickSort();
                break;
            case "heap":
                this.heapSort();
                break;
            case "insertion":
                this.insertionSort();
                break;
        }
    }

    bubbleSort(){
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, swapBars, sorted] = animations[i];

            this.timer = setTimeout(() => {
                if (!swapBars){
                    if (i != animations.length-1) {
                        for (let x = 0; x < arrayBars.length; x++) {
                            if (arrayBars[x].style.backgroundColor != SORTED_COLOR)
                            {
                                if (sorted && (x === barOneIdx)) {
                                    arrayBars[x].style.backgroundColor = SORTED_COLOR;
                                } else if (x === barOneIdx || x === barTwoIdx){
                                    arrayBars[x].style.backgroundColor = SELECTED_COLOR;
                                } else {
                                    arrayBars[x].style.backgroundColor = UNSORTED_COLOR;
                                }
                            }
                        }
                    } else {
                        for (let x = 0; x < arrayBars.length; x++)
                        {
                            arrayBars[x].style.backgroundColor = SORTED_COLOR;
                        }
                    }
                } else {
                    const tempHeight = arrayBars[barOneIdx].style.height;
                    arrayBars[barOneIdx].style.backgroundColor = SWAP_COLOR;
                    arrayBars[barTwoIdx].style.backgroundColor = SWAP_COLOR;
                    arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
                    arrayBars[barTwoIdx].style.height = tempHeight;
                }
            }, i * ANIMATION_SPEED_MS);     
        }
        //End of sorting animation
        this.timer = setTimeout(() => {
            this.sortingButtonsEnabled(true);
        }, animations.length * ANIMATION_SPEED_MS);
        
        console.log(this.state.array);
        //this.forceUpdate();
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
                const color = i % 3 === 0 ? SELECTED_COLOR : UNSORTED_COLOR;
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
            //console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
            console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, insertionSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <section className="sorting-visualizer" id="sorting-visualizer">
                <div className="container-fluid">
                <div className="row justify-content-center d-flex">
                <div className="array-container mt-auto table-responsive">
                <table className="table text-align-center"><tbody>
                <tr className="text-nowrap"><th scope="row">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style=
                            {{
                                backgroundColor: UNSORTED_COLOR,
                                height: `${value/10}vh`,
                                width: `${this.width}vw`
                            }}
                        ></div>
                    ))}
                </th></tr>
                <tr><th scope="row">
                    <button type="button" className="btn btn-sm btn-light" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button type="button" className="btn btn-sm btn-light sort-button" onClick={() => this.sort("bubble")}>Bubble Sort</button>
                    <button type="button" className="btn btn-sm btn-light sort-button" onClick={() => this.sort("merge")}>Merge Sort</button>
                    <button type="button" className="btn btn-sm btn-light sort-button" onClick={() => this.sort("quick")}>Quick Sort</button>
                    <button type="button" className="btn btn-sm btn-light sort-button" onClick={() => this.sort("heap")}>Heap Sort</button>
                    <button type="button" className="btn btn-sm btn-light sort-button" onClick={() => this.sort("insertion")}>Insertion Sort</button>
                </th></tr>
                </tbody></table>
                </div>
                </div>
                </div>

                <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand" href="">Array Sorting Visualizer</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="container">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <button type="button" className="btn btn-sm btn-light" onClick={() => this.testSortingAlgorithm()}>Check Sorting Algorithms</button>
                        
                    </li>
                    </ul>
                </div>
                </div>
                </nav>
            </section> 
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