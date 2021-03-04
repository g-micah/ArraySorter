import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import './bootstrap.css';



// Change this value for the number of bars (value) in the array.
const DEFAULT_ARRAY_SIZE = 15;

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
        
        this.state = { 
            array: [],
            arrSize: DEFAULT_ARRAY_SIZE,
            speedMultiplier: 1
        }
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }
    timeouts;
    sorting;
    width;

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
        //Create new array and update visual
        const array = [];
        for (let i = 0; i < parseInt(size); i++) {
            array.push(randomIntFromInterval(30, 800));
        }
        this.width = (60 /  parseInt(size));
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
        const speed = Math.pow(0.01/(this.state.arrSize), 2) * 500000000;
        console.log('speed: '+speed+'\narrsize: '+this.state.arrSize);
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
        
        console.log(this.state.array);
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
            //const quickSortedArray = sortingAlgorithms.quickSort(array.slice());
            //const heapSortedArray = sortingAlgorithms.heapSort(array.slice());
            const bubbleSortedArray = sortingAlgorithms.bubbleSort(array.slice());
            //const insertionSortedArray = sortingAlgorithms.insertionSort(array.slice());
            //console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
            console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
            //console.log(arraysAreEqual(javaScriptSortedArray, insertionSortedArray));
        }
    }

    render() {
        const array = this.state.array;

        return (
            <section className="sorting-visualizer" id="sorting-visualizer">

                <nav className="navbar navbar-expand  navbar-dark bg-dark py-1">
                <div className="container">
                <a className="navbar-brand" href="#"><b>Array Sorter</b></a>
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">

                    </li>
                    </ul>
                </div>
                </nav>

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
                </tbody></table>
                <table className="table text-align-center"><tbody>
                <tr><th scope="row">
                    <button type="button" className="btn btn-sm btn-light" onClick={() => this.resetArray(this.state.arrSize)}>Generate New Array</button>
                    <select className="form-select" value={this.state.speedMultiplier} onChange={this.handleSpeedChange}>
                        <option value="0.25">Speed: 0.25x</option>
                        <option value="0.5">Speed: 0.5x</option>
                        <option value="1">Speed: 1x</option>
                        <option value="2">Speed: 2x</option>
                        <option value="4">Speed: 4x</option>
                    </select>
                    <select className="form-select" value={this.state.arrSize} onChange={this.handleSizeChange}>
                        <option value="8">Size: 8</option>
                        <option value="14">Size: 14</option>
                        <option value="32">Size: 32</option>
                        <option value="75">Size: 75</option>
                        <option value="200">Size: 200</option>
                    </select>
                    
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