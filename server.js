const express = require('express')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const app = express()
const socket = require('socket.io')

app.use(cors());

const server = app.listen(
    PORT, () => console.log(`Server running on port ${PORT}`)
)

const io = socket(server);

//Snake game data declaration
let canvas = { width: 300, height: 300 }
let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
];
let dx = 10
let dy = 0
let speed = 100
let changingDirection = false
let foodX
let foodY

//.

io.on('connection', socket => {
    console.log("New Connection")

    socket.on("startGame", () => {
        snake = [
            { x: 150, y: 150 },
            { x: 140, y: 150 },
            { x: 130, y: 150 },
            { x: 120, y: 150 },
            { x: 110, y: 150 },
        ];

        dx = 10
        dy = 0

        score = 0;
        changingDirection = false

        createFood()
        main()
    })

    socket.on("changeDirection", (keyPressed) => {
        changeDirection(keyPressed)
    })

    function main() {
        setTimeout(function onTick() {
            changingDirection = false
            moveSnake()
            const gameStateObject = {
                snake: snake,
                score: score,
                food: {
                    X: foodX,
                    Y: foodY
                }
            }

            socket.emit('gameState', gameStateObject)
            main()
        }, speed)
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy }
        snake.unshift(head)

        if (snake[0].x === foodX && snake[0].y === foodY) {
            score += 10;

            createFood();
        } else {
            snake.pop();
        }
    }

    function changeDirection(keyPressed) {

        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        if (changingDirection) return

        changingDirection - true

        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -10
            dy = 0
        }

        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0
            dy = -10
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10
            dy = 0
        }

        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0
            dy = 10
        }
    }
})

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);

    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY
        if (foodIsOnSnake)
            createFood();
    });
}