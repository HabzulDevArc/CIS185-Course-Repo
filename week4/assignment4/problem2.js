// Problem 2: Fall Leaves Counter
// William Allen
// 10/23/25

function countLeaves(days) {
    let total = 0;    // varriable to track amount of leaves fallen
    let leaves = 10; // varriable representing that each day, 10 more leaves fall than the last day
    let leavesAdded = []; //declares an array to store the leaves added each day
    let outputTotal = ""; // declare string that will be returned by the function

    for (let day = 1; day <= days; day++){  // a loop that runs as many times as the input number representing days of leaves falling
        total += leaves;                    // each day adds amount of leaves fallen that day to total leaves fallen
        leavesAdded.push(leaves);           // adds that amount to an array that will be used to make a formatted string
        leaves += 10;                       // updates the amount leaves that will fall the next time the loop runs
    }
    outputTotal = `${total} (${leavesAdded.join(" + ")})`; // formats the string with total leaves after the loop ends and shows how many fell each day from the array
    return outputTotal;
}

function categorizeLeafColors(leaves) {
    let colorCount = {};                                    // declares the colorCount object

    for (let i = 0; i < leaves.length; i++) {               // loop that iterates a number of times equal to the lenght of the input array
        let color = leaves[i];                              // declares a variable and sets it to what's in position i of the input array 
        colorCount[color] = (colorCount[color] || 0) + 1;   // adds 1 to the value of the color in the array colorCount if it already exits or adds the color to the array set to 0 then adds 1
    }                                                       
    
    return colorCount;
}

// countLeaves() Test Cases
console.log(countLeaves(1));
console.log(countLeaves(2));
console.log(countLeaves(4));
console.log(countLeaves(5));

// categorizeLeafColors() Test Cases
console.log(categorizeLeafColors(["red", "yellow", "red", "brown"]));
console.log(categorizeLeafColors(["orange", "orange", "orange"]));
console.log(categorizeLeafColors([]));