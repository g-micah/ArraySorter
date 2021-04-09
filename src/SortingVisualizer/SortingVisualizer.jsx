import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import './bootstrap.css';

// This is the default sort type selected
const DEFAULT_SORT_TYPE = 'merge';

// Change this value for the number of bars (value) in the array.
const DEFAULT_ARRAY_SIZE = 75;

// This is the default sort type selected
const DEFAULT_SORT_SPEED = 1;

// This is the main color of the array bars.
const UNSORTED_COLOR = 'lightblue';

// This is the main color of the array bars after being sorted.
const SORTED_COLOR = 'rgb(145, 170, 178)';

// This is the color of array bars that are being compared throughout the animations.
const SELECTED_COLOR = 'rgb(255, 235, 55)';

// This is the color of array bars that have just been swapped
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
            speedMultiplier: DEFAULT_SORT_SPEED,
            sortType: DEFAULT_SORT_TYPE
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
            array.push(randomIntFromInterval(275, 1000));
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
        var animations = [];
        this.sorting = true;
        //Clear tiemouts array
        this.timeouts = [];
        //Clear all bars color
        this.clearBarsColor();
        //Disable buttoms
        this.sortingButtonsEnabled(false);
        console.log("Initiating "+type+" sort!");

        switch(type)
        {
            case "bubble":
                animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
                break;
            case "quick":
                animations = sortingAlgorithms.getQuickSortAnimations(this.state.array);
                break;
            case "merge":
                animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);
                break;
            case "heap":
                animations = sortingAlgorithms.getHeapSortAnimations(this.state.array);
                break;
            case "insertion":
                animations = sortingAlgorithms.getInsertionSortAnimations(this.state.array);
                break;
            default:
                this.sorting = false;
                this.sortingButtonsEnabled(true);
                animations = [];
                console.log("ERROR: Sort does not exist yet!");
                break;
        }

        this.displayAnimations(animations);
    }

    /* 
     * Animation 3D array use:
     * [var1, var2, action]
     * 
     * action:
     *  - 0, highlight: Highlight both indexes
     *  - 1, swap:    Swap values at 2 var indexes
     *  - 2, isSorted:  Set index var1 through index var2 color to sorted
     *  - 3, insert:    Set value at index var1 equal to var2
     *  - 4, swapShift: Swap values at 2 var indexes then insert right value directly next to left value and shift
     */
    displayAnimations(animations){
        const speed = (Math.pow(1/(this.state.arrSize), 2) * 50000)/this.state.speedMultiplier;
        var extraTiming = 0;
        let actionCount = animations.length;
        for (let i = 1; i < animations.length; i++) {
            if (animations[i][2] === 2 && animations[i-1][2]) {
                actionCount--;
            }
        }
        //console.log("actions: "+actionCount+"\nlength: "+animations.length);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [var1, var2, action] = animations[i];

            this.timeouts.push(setTimeout(() => {
                switch (action)
                {
                    //highlight
                    case 0:
                        for (let x = 0; x < arrayBars.length; x++) {
                            if (arrayBars[x].style.backgroundColor !== SORTED_COLOR)
                            {
                                if (x === var1 || x === var2){
                                    arrayBars[x].style.backgroundColor = SELECTED_COLOR;
                                } else {
                                    arrayBars[x].style.backgroundColor = UNSORTED_COLOR;
                                }
                            }
                        }
                        break;

                    //swap
                    case 1:
                        const tempHeight = arrayBars[var1].style.height;
                        arrayBars[var1].style.backgroundColor = SWAP_COLOR;
                        arrayBars[var2].style.backgroundColor = SWAP_COLOR;
                        arrayBars[var1].style.height = arrayBars[var2].style.height;
                        arrayBars[var2].style.height = tempHeight;
                        break;

                    //isSorted
                    case 2: 
                        //Check if next action is sort highlight
                        let sortedVar1, sortedVar2;
                        let loop = true;
                        i--;
                        
                        while (loop) {
                            loop = false;
                            i++;
                            extraTiming++;
                            [sortedVar1, sortedVar2] = animations[i];
                            for (let x = 0; x < arrayBars.length; x++) {
                                if (x >= sortedVar1 && x <= sortedVar2) {
                                    arrayBars[x].style.backgroundColor = SORTED_COLOR;
                                }
                            }
                            if (i+1 < animations.length-1) {
                                if (animations[i+1][2] === 2)
                                {
                                    loop = true;
                                }
                            }
                        } 
                        break;

                    //insert
                    case 3:
                        arrayBars[var1].style.backgroundColor = SWAP_COLOR;
                        arrayBars[var1].style.height = "max(calc("+var2/10+"vh - 115px), 1px)"
                        break;

                    //swapShift
                    case 4:
                        //swap
                        const tempHeight2 = arrayBars[var1].style.height;
                        arrayBars[var1].style.height = arrayBars[var2].style.height;
                        let temp = var2;
                        while (temp > var1) {
                            //move and shift to right
                            arrayBars[temp].style.height = arrayBars[temp-1].style.height;
                            temp--;
                        }
                        arrayBars[var1+1].style.height = tempHeight2;

                        for (let x = 0; x < arrayBars.length; x++) {
                            if (arrayBars[x].style.backgroundColor !== SORTED_COLOR)
                            {
                                if (x === var1 || x === var1+1)
                                {
                                    arrayBars[x].style.backgroundColor = SWAP_COLOR;
                                }
                                else
                                {
                                    arrayBars[x].style.backgroundColor = UNSORTED_COLOR;
                                }
                            }
                        }
                        break;

                    default:
                        console.log("ERROR: Sort step action not specified!");
                        break;
                }
                if (i >= animations.length-1) {
                    for (let x = 0; x < arrayBars.length; x++) {
                        arrayBars[x].style.backgroundColor = SORTED_COLOR;
                    }
                }
            }, (i-extraTiming) * speed));     
        }
        //Runs at the end of sorting animation
        this.timeouts.push(setTimeout(() => {
            this.sortingButtonsEnabled(true);
            this.sorting = false;
        }, actionCount * speed));
    }

    testSortingAlgorithms(){
        //Creates 100 arrays and checks each array for sorting against JavaScript sort
        let sortFailed = false;
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let j = 0; j < length; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const bubbleSortedArray = sortingAlgorithms.bubbleSortArray(array.slice());
            const quickSortedArray = sortingAlgorithms.quickSort(array.slice());
            const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice(), 0, true, []);
            const heapSortedArray = sortingAlgorithms.heapSort(array.slice(), []);
            const insertionSortedArray = sortingAlgorithms.insertionSort(array.slice(), []);
            if (!arraysAreEqual(javaScriptSortedArray, bubbleSortedArray)) sortFailed = true;
            if (!arraysAreEqual(javaScriptSortedArray, mergeSortedArray)) sortFailed = true;
            if (!arraysAreEqual(javaScriptSortedArray, quickSortedArray)) sortFailed = true;
            if (!arraysAreEqual(javaScriptSortedArray, heapSortedArray)) sortFailed = true;
            if (!arraysAreEqual(javaScriptSortedArray, insertionSortedArray)) sortFailed = true;
        }
        if (sortFailed)
        {
            console.log("A FAILURE WAS DETECTED.");
        } else {
            console.log("EACH SORT PREFORMED 100 [1,000 LENGTH ARRAY] TESTS SUCCESSFULLY.");
        }
        
    }


//<button type="button" className="btn btn-sm btn-light text-nowrap" onClick={() => this.testSortingAlgorithms()}>ALGORITHM-TEST</button>
    render() {
        const array = this.state.array;

        return (
            <section className="sorting-visualizer overflow-hidden" id="sorting-visualizer">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-sm">
                <div className="navbar-brand"><b>Array Sorter</b></div>
                    <ul className="navbar-nav">
                    <button type="button" className="btn btn-sm btn-light text-nowrap" onClick={() => this.testSortingAlgorithms()}>ALGORITHM-TEST</button>
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
                            <option value="quick">Quick Sort</option>
                            <option value="merge">Merge Sort</option>
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
                            <option value="130">130</option>
                            <option value="200">200</option>
                            <option value="400">400</option>
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
                                    height: `max(calc(${value/10}vh - 115px), 1px)`,
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
//<button type="button" className="btn btn-sm btn-light text-nowrap" onClick={() => this.testSortingAlgorithm()}>BIGTEST</button>

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