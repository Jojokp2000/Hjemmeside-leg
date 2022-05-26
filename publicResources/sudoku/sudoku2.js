let inputs = document.querySelectorAll("input"); 
inputs.forEach(element => {
    element.setAttribute("oninput", "javascript: if (this.value.length > 1) {this.value = this.value.slice(0, 1);} if (this.value == 0) {this.value = NaN}");
});

let button = document.querySelector("button");

button.addEventListener("click", solveSudoku);

function solveSudoku() {
    let sudoku = [];

    inputs.forEach((element, index) => {
        sudoku[index] = element.value != '' ? element.value : 0;
        element.style.backgroundColor = sudoku[index] !== 0 ? "green" : "red";
    })

    
    // sudoku = [1, 2, 3, 4, 5, 6, 7, 8, 9,
    //     4, 5, 6, 7, 8, 9, 1, 2, 3,
    //     7, 8, 9, 1, 2, 3, 4, 5, 6,
    //     2, 1, 4, 2, 3, 5, 6, 9, 7,
    //     3, 6, 8, 9, 4, 7, 2, 1, 5,
    //     5, 9, 7, 6, 1, 8, 3, 4, 8, 
    //     6, 3, 1, 5, 9, 2, 8, 7, 4,
    //     8, 7, 5, 3, 6, 4, 9, 1, 2,
    //     9, 4, 2, 8, 7, 1, 5, 3, 1];
        
    // sudoku = [1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3, 4, 5, 6, 2, 1, 4, 3, 6, 5, 8, 9, 7, 3, 6, 5, 8, 9, 7, 2, 1, 4, 8, 9, 7, 2, 1, 4, 3, 6, 5, 5, 3, 1, 6, 4, 2, 9, 7, 8, 6, 4, 2, 9, 7, 8, 5, 3, 1, 9, 7, 8, 5, 3, 1, 6, 4, 0];
    solver2(sudoku);


    console.log(sudoku);
    inputs.forEach((element, index) => {
        element.value = sudoku[index]
    })


    
}


function solver2(sudoku) {
    let emptyIndex = findEmpty(sudoku);
    
    if (emptyIndex == -1 && checkForFail2(sudoku)) {
        return true;
    }
    
    for (let num = 1; num <= 9; num++) {
        if (checkForFail2(sudoku)) {
            sudoku[emptyIndex] = num;
            if (solver2(sudoku)) {
                return true;
            }
            sudoku[emptyIndex] = 0;

        }       
    }
}

function findEmpty(sudoku) {
    for (let i = 0; i < 81; i++) {
        if (sudoku[i] == 0) {
            return i;
        }   
    }
    return -1;    
}


function solver(sudoku) {

    for (let i = 0; i < 81; i++) {
        if (sudoku[i] == 0) {
            for (let num = 1; num <= 9; num++) {
                if (checkForFail2(sudoku)){
                    sudoku[i] = num;
                    solver(sudoku)
                    sudoku[i] = 0;
                }
            }
            return false;
        }    
    }
    return true;
}


function checkForFail2(sudoku) {
    let index = 0;
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (!isSafe(sudoku, index, row, column)) {
                // console.log(`violation at: ${column}, ${row}. index ${index}`);
                return false;
            }
            // console.log(index);
            index++;
        }    
    }
    return true;
}

function isSafe(sudoku, index, row, column) {
    for (let i = 0; i < 9; i++) {
        let bIndex = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(column / 3) * 3) + (i % 3);
        // if ((sudoku[index] == sudoku[(row * 9) + i] ||
        //     sudoku[index] == sudoku[column + (i * 9)] ||
        //     sudoku[index] == sudoku[bIndex]) &&
        //     ((row * 9) + i) !== index &&
        //     (column + (i * 9)) !== index &&
        //     bIndex !== index &&
        //     sudoku[index] !== 0) {
        //     return false;
        // }

        if (((sudoku[index] == sudoku[(row * 9) + i] && ((row * 9) + i) !== index) ||
            (sudoku[index] == sudoku[column + (i * 9)] && (column + (i * 9)) !== index) ||
            (sudoku[index] == sudoku[bIndex] && bIndex !== index)) &&       
            sudoku[index] !== 0) {
            return false;
        }

        // if (sudoku[index] == sudoku[(row * 9) + i] && ((row * 9) + i) !== index && sudoku[index] !== 0) {
        //     return false;
        // }
        // if (sudoku[index] == sudoku[column + (i * 9)] && (column + (i * 9)) !== index && sudoku[index] !== 0) {
        //     return false;
        // }
        // if (sudoku[index] == sudoku[bIndex] && bIndex !== index && sudoku[index] !== 0){
        //     return false;
        // }
    }
    return true;
}