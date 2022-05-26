
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver){
      alert(`You lost. Snake length was ${snakeBody.length}`)
      return;
    }


    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
        return;
    }
    lastRenderTime = currentTime;

    update();
    draw();

}

window.requestAnimationFrame(main);

function update() {
   updateSnake(); 
   updateFood();
   checkDeath()
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function restart () {
    location.reload();
}

function getConstants (){
    SNAKE_SPEED = window.prompt("Enter snake speed (if no value is entered, the speed will be 5)");
    SNAKE_SPEED = SNAKE_SPEED ? SNAKE_SPEED : 5;
    EXPANSION_RATE = window.prompt("Enter expansion rate (if no value is entered, the expansion rate will be 1)");
    EXPANSION_RATE = EXPANSION_RATE ? EXPANSION_RATE : 1;

    console.log('Speed has been set to ' + SNAKE_SPEED + ', and expansion rate has been set to ' + EXPANSION_RATE);
}

setTimeout(getConstants, 50);