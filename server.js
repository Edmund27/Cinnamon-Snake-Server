const express = require('express')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const app = express()

app.use(cors());

const server = app.listen(
    PORT, () => console.log(`Server running on port ${PORT}`)
)