// Problem 2: Fall Leaves Counter
// William Allen
// 10/23/25

function countLeaves(days) {
    let total = 0;
    let leaves = 10;
    let outputTotal = [];

    for (let day = 1; day <= days; day++){
        total += leaves;
        outputTotal.push(leaves);
        leaves += 10;
    }
    
    return `${total} (${outputTotal.join(" + ")})`;
}

function categorizeLeafColors(leaves) {
    let colorCount = {};

    for (let i = 0; i < leaves.length; i++) {
        let color = leaves[i];
        colorCount[color] = (colorCount[color] || 0) + 1;
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