// Problem 1: Temperature Converter Suite
// William Allen
// 10/23/25

function calculateAverage(scores) {
    if (scores.length > 0) {
        let average = scores.reduce((total, num) => total + num, 0) / scores.length;   // use the .reduce method to sum up all the numbers in the array then divide that by the number of objects in the array to get an average
        return average;
    }
    else
        return 0;   // returns 0 in the case of an empty array
}

function dropLowestScore(scores) {
    let lowestDropped = [];              // create new array to house scores to drop lowest from
    scores.forEach(element => {         // populate new array with each element from scores
        lowestDropped.push(element);    
    });
    
    let spliceIndex = 0;                                // create variable to hold index of the lowest value
    let lowest = lowestDropped[0];                      // set variable lowest to the first score in the array

    for (let i = 0; i < lowestDropped.length; i++){     // loop that checks to see if each score is lower than the lowest score so far 
        if (lowestDropped[i] < lowest) {                // each loop checks if the next score is less than what's stored in lowest
            lowest = lowestDropped[i];                  // if it is, lowest is set to that score before looping again
            spliceIndex = i;                            // keeps track of the index of the lowest score
        }
    }
    lowestDropped.splice(spliceIndex, 1);               // removes the score at the index determined by the loop to be the lowest
    return lowestDropped;
}    

function getLetterGrade(score) {                        // pretty simple, check if statements until one of the conditions are true to return grade.
    if (score <= 100  & score >= 90) return "A";
    if (score < 90  & score >= 80) return "B";
    if (score < 80  & score >= 70) return "C";
    if (score < 70  & score >= 60) return "D";
    return "F";
}

function curveGrades(scores, curveAmount) {
    let newScores = scores.map(element => Math.min(element + curveAmount, 100)); // creates a new array using the map function to increase each score from the input array by the curveAmount
    return newScores;                                                            // using Math.min to take the smaller of score + curveAmount or 100 to ensure that no curved score could exceed the max grade       
}

// Test Cases 
console.log(calculateAverage([80, 90, 70]));
console.log(calculateAverage([100, 50, 75]));
console.log(calculateAverage([]));

console.log(dropLowestScore([80, 90, 70, 85]));
console.log(dropLowestScore([50, 50, 75, 100]));

console.log(getLetterGrade(95));
console.log(getLetterGrade(82));
console.log(getLetterGrade(58));

console.log(curveGrades([85, 95, 70], 10));
console.log(curveGrades([90, 96, 80], 5));