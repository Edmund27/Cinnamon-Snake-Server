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

//.

io.on('connection', socket => {
    console.log("New Connection")
    const gameStateObject = {
        snake: snake,
        canvas: canvas
    }

    socket.emit('gameState', gameStateObject)
})