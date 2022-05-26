
let inputs = document.querySelectorAll("input"); 
inputs.forEach(element => {
    element.setAttribute("oninput", "javascript: if (this.value.length > 1) {this.value = this.value.slice(0, 1);} if (this.value == 0) {this.value = NaN}");
});



let button = document.querySelector("button");

button.addEventListener("click", solveSudoku);

function solveSudoku() {
    let sudoku = [];

    let inputs = document.querySelectorAll("input");
    inputs.forEach((element, index) => {
        sudoku[index] = element.value != '' ? element.value : 0;
        element.style.backgroundColor = sudoku[index] !== 0 ? "green" : "red";
    })

    // sudoku = [  1, 8, 4, 7, 3, 2, 5, 9, 6,
    //             5, 9, 7, 6, 1, 8, 2, 4, 3,
    //             2, 6, 3, 5, 4, 9, 8, 1, 7,
    //             9, 7, 8, 3, 2, 1, 6, 5, 4,
    //             4, 3, 5, 9, 6, 7, 1, 2, 8,
    //             6, 1, 2, 8, 5, 4, 7, 3, 9,
    //             3, 5, 9, 2, 8, 6, 4, 7, 1,
    //             8, 2, 1, 4, 7, 3, 9, 6, 5,
    //             7, 4, 6, 1, 9, 5, 3, 8, 2]
    
    // placeDigit(initSudoku, sudoku, 0, 0);

    solver(sudoku);

    inputs.forEach((element, index) => {
        element.value = sudoku[index]
    })

    console.log(sudoku);
    // console.log(`My solution: ${checkForFail(sudoku)}`);
    // console.log(`Other solution: ${checkForFail2(sudoku)}`);
}


function solver(sudoku) {

    let indexToCheck;
    let isEmpty = true;

    for (let i = 0; i < sudoku.length; i++) {
        if (sudoku[i] === 0) {
            indexToCheck = i;
            isEmpty = false;
             break;
        }
    }

    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= 9; num++) {
        if (checkForFail2(sudoku)) {
            sudoku[indexToCheck] = num
            if (solver(sudoku)) {
                return true;
            }
            else {
                sudoku[indexToCheck] = 0;
            }
        }
    }
    return false;
}



// returns true if there is no violations. Otherwise return false
function checkForFail(sudoku) {
    let index = 0;
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (!possible(sudoku, index, column, row)) {
                return false;
            }
            index++;
        }    
    }
    return true;
}

// returns true if there is no violations. Otherwise return false
function checkForFail2(sudoku) {
    let index = 0;
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (!checkCandidate(sudoku, index, row, column)) {
                return false;
            }
            index++;
        }    
    }
    return true;
}

function checkCandidate(sudoku, index, row, column) {
    for (let i = 0; i < 9; i++) {
        let bIndex = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(column / 3) * 3) + (i % 3);
        if ((sudoku[index] == sudoku[(row * 9) + i] ||
            sudoku[index] == sudoku[column + (i * 9)] ||
            sudoku[index] == sudoku[bIndex]) &&
            ((row * 9) + i) !== index &&
            (column + (i * 9)) !== index &&
            bIndex !== index &&
            sudoku[index] !== 0) {
            return false;
        }
    }
    return true;
}

function possible(sudoku, index, column, row) {

    if ((checkColumn(sudoku, index, column, row) &&
        checkRow(sudoku, index, column, row) &&
        checkBox(sudoku, index, column, row)) ||
        sudoku[index] === 0) {
        return true;
    }
    else{
        return false;
    }
}

function checkRow(sudoku, index, column, row) {
    switch (row) {
        case 0: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 1: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 2: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 3: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 4: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 5: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 6: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 7: 
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break; 
        case 8:
            for (let i = 0; i < 9; i++) {
                if (i !== column && sudoku[i + (row * 9)] === sudoku[index]) {
                    return false;
                }           
            }
            break;
    
        default:
            console.error("row not found");
            break;
    }
    return true;
}

function checkColumn(sudoku, index, column, row) {
    switch (column) {
        case 0: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 1: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 2: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 3: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 4: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break; 
        case 5: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break; 
        case 6: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;
        case 7: 
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;            
        case 8:
            for (let i = 0; i < 9; i++) {
                if (i !== row && sudoku[i * 9 + column] === sudoku[index]) {
                    return false;
                }           
            }
            break;
    
        default:
            console.error("column not found");
            break;
    }
    return true;
}

function checkBox(sudoku, index, column, row) {
    let boxNumber = findBox(column, row);
    let j;
    switch (boxNumber) {
        case 1:
            j = 0;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 2:
            j = 3;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 3:
            j = 6;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                } 
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 4:
            j = 27;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 5:
            j = 30;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 6:
            j = 33;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 7:
            j = 54;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 8:
            j = 57;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
        case 9:
            j = 60;
            for (let i = 0; i < 9; i++) {
                if (index !== j && sudoku[index] === sudoku[j]) {
                    return false;
                }  
                 j = i % 3 === 2 ? j + 7 : j + 1;  
            }
            break;
    
        default:
            console.error("Box not found");
            break;
        }
    return true;
        
}

function findBox(column, row) {
    if (row <= 2) {
        if (column <= 2) {
            return 1;
        }
        else if (column >= 6) {
            return 3
        }
        else {
            return 2
        }
    }
    else if (row >= 6) {
        if (column <= 2) {
            return 4;
        }
        else if (column >= 6) {
            return 6
        }
        else {
            return 5
        }
    }
    else {
        if (column <= 2) {
            return 7;
        }
        else if (column >= 6) {
            return 9
        }
        else {
            return 8
        }
    }
}

