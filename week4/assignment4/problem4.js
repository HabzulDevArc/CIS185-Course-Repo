// Problem 1: Temperature Converter Suite
// William Allen
// 10/23/25

function createPyramid(height) {
    let pyramid = "";                   // declare string to hold the pyramid
    let row = 0;                        // declare variable to keep track of which is being printed to influence the number of spaces and *s
    for (i = 0; i < height; i++) {      // for loop that creates a new row for the pyramid for each unit of height
        pyramid += ' '.repeat(height - row - 1) + '*'.repeat(2 * row + 1) + '\n';   // formatted string repeats spaces and then stars depending on which row the loop is on
        row++;                            
    }
    return pyramid;
}

function createNumberStaircase(steps) {
    let numberStaircase = "";               // declare string to hold the staircase
    for (i = 1; i <= steps; i++) {
        let numberStep = "";                // declare varaible to hold all the numbers on each step, resets at start of each loop
        for (j = 1; j <= i; j++) {          // loop inside loop to add each number on step to numberStep
        numberStep += j;
        }
        numberStaircase += numberStep + "\n";   // add number step to the staircase with and make a new line for future steps
    }
    return numberStaircase;
}

function createCheckerboard(size) {
    let checkerPattern = "";            //declare a varriable to hold current pattern
    let checkerBoard = "";              //declare a variable to hold the whole board
    for (i = 0; i < size; i++){     
        if (i % 2 === 0) {              // for loop that alternates which pattern is added to the board based on even or odd number i
            checkerPattern = "XOXO";
        }
        else
            checkerPattern = "OXOX";
        checkerBoard += checkerPattern + "\n"
    }
    return checkerBoard;
}

console.log(createPyramid(3));
console.log(createPyramid(4));

console.log(createNumberStaircase(5));

console.log(createCheckerboard(4));