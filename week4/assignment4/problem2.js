// Problem 2: Fall Leaves Counter
// William Allen
// 10/23/25

function countLeaves(days) {
    let total = 0;
    let leaves = 10;
    let outputTotal = "";

    for (let day = 1; day <= days; day++){
        total += leaves;
        leaves += 10;
        
    }
    
    return total;
}

// Test Cases
console.log(countLeaves(1));
console.log(countLeaves(2));
console.log(countLeaves(4));
console.log(countLeaves(5));