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

io.on('connection', socket => {
    console.log('new connection')
    socket.emit('connected', "hello world!")
})