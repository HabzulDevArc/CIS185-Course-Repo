// Problem 1: Temperature Converter Suite
// William Allen
// 10/23/25

function reverseArray(arr) {
    let arrayReversed = [];                         // declare new array to hold the values in reverse order
    for (i = (arr.length-1); i >= 0; i--) {         // loop that starts at the last element in arr and pushes its value into arrayReversed, then iterates backwards through each element of arr
        arrayReversed.push(arr[i]);
    }
    return arrayReversed;
}

function removeDuplicates(arr) {
    let noDupes = [];                                // declare new array to hold non-duplicate values
    for (i = 0; i < arr.length; i++){              
        let dupeCheck = false;                       // declare variable used to see if element is duplicate, resets on each loop   
        for (j = 0; j < noDupes.length; j++) {       // loop that checks if element already exists in noDupes. If yes, changes dupeCheck to true and exits inner loop to check next element in arr
            if (arr[i] === noDupes[j]){              
                dupeCheck = true;
                break;
            }
        }
        if (dupeCheck === false) {                    // if it's not already in noDupes, adds it to the array
            noDupes.push(arr[i]);
        }        
    }
    return noDupes;
}

function rotateArray(arr, position) {    
    for (i = 0; i < position; i++){      // creates a loop that pops the last value of arr, and uses the unshift method to put that popped value in front of the array
        arr.unshift(arr.pop());          // a number of times equal to the position value
    }
    return arr;
}

function findSecondLargest(numbers) {

}

// Test Cases
console.log(reverseArray([1, 2, 3, 4]));
console.log(reverseArray(["a", "b", "c"]));
console.log(reverseArray([]));

console.log(removeDuplicates([1, 2, 2, 3, 1, 4]));
console.log(removeDuplicates(["a", "b", "a", "c"]));

console.log(rotateArray([1, 2, 3, 4], 1));
console.log(rotateArray([1, 2, 3, 4], 2));
console.log(rotateArray([1, 2, 3], 4));

console.log(findSecondLargest(5, 5, 5));
console.log(findSecondLargest([100, 50, 100, 75]));