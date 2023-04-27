const express = require('express');
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE"],
    },
})

// Socket
io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);

    socket.on('send_tweet', (data) => {
        console.log(data);
        io.emit('send_tweet', data)
    })
})

//api
const routes = require('./routes.js')
app.use('/api', routes)

server.listen(3001, () => {
    console.log("server is running at port 3001");
})