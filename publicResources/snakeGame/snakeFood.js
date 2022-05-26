
let food = getRandomFoodPosition();
let EXPANSION_RATE = 1;

function updateFood() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
}

function drawFood(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);  
}

function getRandomFoodPosition(){
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

