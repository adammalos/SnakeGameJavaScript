import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
let score = 0;
const EXPANSION_RATE = 1

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        score += 1
        const highScore = localStorage.getItem('highScore') || 0;
        if (score > highScore) {
            localStorage.setItem('highScore', score);
        }

    }

}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
    // score
    const scoreElement = document.querySelector('.score');
    scoreElement.innerText = `Score: ${score}`;
    // highScore
    const highScore = localStorage.getItem('highScore') || 0;
    const highScoreElement = document.querySelector('.high-score');
    highScoreElement.innerText = `High Score: ${highScore}`;

}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}