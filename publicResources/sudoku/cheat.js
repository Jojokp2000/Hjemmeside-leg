/* A Backtracking program in
Javascript to solve Sudoku problem */
 
function isSafe(board, row, col, num)
{
     
    // Row has the unique (row-clash)
    for(let d = 0; d < board.length; d++)
    {
         
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] == num)
        {
            return false;
        }
    }
 
    // Column has the unique numbers (column-clash)
    for(let r = 0; r < board.length; r++)
    {
          
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (board[r][col] == num)
        {
            return false;
        }
    }
 
    // Corresponding square has
    // unique number (box-clash)
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (board[r][d] == num)
            {
                return false;
            }
        }
    }
 
    // If there is no clash, it's safe
    return true;
}
 
function solveSudoku(board, n)
{
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (board[i][j] == 0)
            {
                row = i;
                col = j;
 
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
 
    // No empty space left
    if (isEmpty)
    {
        return true;
    }
 
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        if (isSafe(board, row, col, num))
        {
            board[row][col] = num;
            if (solveSudoku(board, n))
            {
                 
                // print(board, n);
                return true;
            }
            else
            {
                 
                // Replace it
                board[row][col] = 0;
            }
        }
    }
    return false;
}
 
function print(board, N)
{
     
    // We got the answer, just print it
    for(let r = 0; r < N; r++)
    {
        for(let d = 0; d < N; d++)
        {
            document.write(board[r][d]);
            document.write(" ");
        }
        document.write("<br>");
 
        if ((r + 1) % Math.floor(Math.sqrt(N)) == 0)
        {
            document.write("");
        }
    }
}
 
// Driver Code
let board = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]];
         
let N = board.length;

let initsudoku;
let sudoku = [];
let column;
let row;
let temp = []
// let inputs = document.querySelectorAll("input"); 
// inputs.forEach(element => {
//     element.setAttribute("oninput", "javascript: if (this.value.length > 1) {this.value = this.value.slice(0, 1);} if (this.value == 0) {this.value = NaN}");
// });

let button = document.querySelector("button");

// button.addEventListener("click", clicked);


function clicked() {
  inputs.forEach((element, index) => {
    column = index % 9;
    row = Math.floor(index / 9);
    temp[column] = element.value != '' ? element.value : 0;
    if (column === 8) {
      sudoku.push(temp);
      temp = [];
    }
  })

  inputs.forEach((element, index) => {
    let column = index % 9;
    let row = Math.floor(index / 9);
    element.style.backgroundColor = sudoku[row][column] !== 0 ? "green" : "red";
  })
  if (solveSudoku(sudoku, N))
  {
    console.log("done");
    inputs.forEach((element, index) => {
      let column = index % 9;
      let row = Math.floor(index / 9);
      element.value = sudoku[row][column];
  })
     
  }
  else 
  {
    console.log("No solution");
  }

}
 

 
// This code is contributed by avanitrachhadiya2155