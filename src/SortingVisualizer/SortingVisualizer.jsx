import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import './bootstrap.css';



// Change this value for the number of bars (value) in the array.
const DEFAULT_ARRAY_SIZE = 14;

// This is the main color of the array bars.
const UNSORTED_COLOR = 'lightblue';

const SORTED_COLOR = 'rgb(145, 170, 178)';

// This is the color of array bars that are being compared throughout the animations.
const SELECTED_COLOR = 'rgb(255, 235, 55)';

const SWAP_COLOR = 'rgb(255, 27, 27)';


export default class SortingVisualizer extends React.Component {
    constructor (props) {
        super(props);
        this.timeouts = [];
        this.sorting = false;
        this.width = 0;
        this.barMargin = 1;
        
        this.state = { 
            array: [],
            arrSize: DEFAULT_ARRAY_SIZE,
            speedMultiplier: 1,
            sortType: 'bubble'
        }
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }
    timeouts;
    sorting;
    width;
    barMargin;

    handleTypeChange(event) {
        const value = event.target.value;
        this.setState(function(state) {
            return {
                sortType: value
            }
        })
        if (this.sorting)
        {
            this.resetArray(this.state.arrSize);
        }
    }

    handleSizeChange(event) {
        const value = event.target.value;
        this.setState(function(state) {
            return {
                arrSize: value
            }
        })
        this.resetArray(value);
    }

    handleSpeedChange(event) {
        const value = event.target.value;
        this.setState(function(state) {
            return {
                speedMultiplier: value
            }
        })
    }

    componentDidMount() {
        this.resetArray(this.state.arrSize);
    }

    resetArray(size) {
        //End current sorting animation
        if(this.sorting)
        {
            this.cancelCurrentSort();
        }
        //Create new arrays and update visual
        const array = [];
        for (let i = 0; i < parseInt(size); i++) {
            array.push(randomIntFromInterval(30, 800));
        }
        this.width = (94 /  parseInt(size));
        if(size <= 10){
            this.barMargin = 10;
        } else if (size <= 20) {
            this.barMargin = 6;
        } else if (size <= 40) {
            this.barMargin = 3;
        } else if (size <= 80) {
            this.barMargin = 1.5;
        } else if (size <= 150) {
            this.barMargin = 1;
        } else {
            this.barMargin = 0.5;
        }
            
        this.setState({array: array});
        //Clear all bars color
        this.clearBarsColor();
        //Enable sorting buttons
        this.sortingButtonsEnabled(true);
    }

    cancelCurrentSort() {
        this.sorting = false;
        for (var i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        this.timeouts = [];
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
        this.sorting = true;
        //Clear tiemouts array
        this.timeouts = [];
        //Clear all bars color
        this.clearBarsColor();
        //Disable buttoms
        this.sortingButtonsEnabled(false);
        console.log(type+" sort!");

        switch(type)
        {
            case "bubble":
                this.bubbleSort();
                break;
                /*
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
                */
            default:
                this.sorting = false;
                this.sortingButtonsEnabled(true);
                console.log("ERROR: Sort does not exist yet!");
                break;
        }
    }

    bubbleSort(){
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
        const speed = (Math.pow(1/(this.state.arrSize), 2) * 50000)/this.state.speedMultiplier;

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, swapBars, sorted] = animations[i];

            this.timeouts.push(setTimeout(() => {
                if (!swapBars){
                    if (i !== animations.length-1) {
                        for (let x = 0; x < arrayBars.length; x++) {
                            if (arrayBars[x].style.backgroundColor !== SORTED_COLOR)
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
                        for (let x = 0; x < arrayBars.length; x++) {
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
            }, i * speed));     
        }
        //End of sorting animation
        this.timeouts.push(setTimeout(() => {
            this.sortingButtonsEnabled(true);
            this.sorting = false;
        }, animations.length * speed));
    }
    
    mergeSort() {
        /*
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
        */
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
            for (let j = 0; j < length; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            //const mergeSortedArray = sortingAlgorithms.getMergeSortAnimations(array.slice());
            const quickSortedArray = sortingAlgorithms.quickSort(array.slice(), 0, array.length - 1);
            //const heapSortedArray = sortingAlgorithms.heapSort(array.slice());
            const bubbleSortedArray = sortingAlgorithms.bubbleSort(array.slice());
            //const insertionSortedArray = sortingAlgorithms.insertionSort(array.slice());
            //console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
            console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, insertionSortedArray));
        }
    }

    render() {
        const array = this.state.array;

        return (
            <section className="sorting-visualizer overflow-hidden" id="sorting-visualizer">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-sm">
                <div className="navbar-brand"><b>Array Sorter</b></div>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                    <button type="button" className="btn btn-sm btn-light text-nowrap" onClick={() => this.testSortingAlgorithm()}>BIGTEST</button>
                    </li>
                    <li className="nav-item">
                    <button type="button" className="btn btn-sm btn-light text-nowrap" onClick={() => this.resetArray(this.state.arrSize)}>New Array</button>
                    </li>
                    <li className="nav-item">
                    <button type="button" className="btn btn-sm btn-light sort-button" onClick={() => this.sort(this.state.sortType)}>Sort!</button>
                    </li>
                    </ul>
                </div>
                </nav>
                <div className="container">
                <div className="row justify-content-center d-flex">
                <div className="table-responsive">
                <table className="table text-align-center"><tbody>
                <tr className="text-nowrap"><th scope="row">
                    <div className="d-inline-block">
                        <label htmlFor="type">Type</label>
                        <select className="form-select type-select" id="type" value={this.state.sortType} onChange={this.handleTypeChange}>
                            <option value="bubble">Bubble Sort</option>
                            <option value="merge">Merge Sort</option>
                            <option value="quick">Quick Sort</option>
                            <option value="heap">Heap Sort</option>
                            <option value="insertion">Insertion Sort</option>
                        </select>
                    </div>
                    <div className="d-inline-block">
                        <label htmlFor="size">Size</label>
                        <select className="form-select other-select" id="size" value={this.state.arrSize} onChange={this.handleSizeChange}>
                            <option value="8">8</option>
                            <option value="14">14</option>
                            <option value="32">32</option>
                            <option value="75">75</option>
                            <option value="130">150</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                    <div className="d-inline-block">
                        <label htmlFor="speed">Speed</label>
                        <select className="form-select other-select sort-button" id="speed" value={this.state.speedMultiplier} onChange={this.handleSpeedChange}>
                        <option value="0.1">0.1x</option>
                            <option value="0.3">0.3x</option>
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="4">4x</option>
                            <option value="8">8x</option>
                            <option value="16">16x</option>
                        </select>
                    </div>
                </th></tr>
                </tbody></table>
                </div>

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
                                    width: `max(calc(${this.width}% - ${this.barMargin*2}px), 1px)`,
                                    margin: `0px ${this.barMargin}px`
                                }}
                            ></div>
                        ))}
                    </th></tr>
                    </tbody></table>
                </div>
                </div>
                </div>
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