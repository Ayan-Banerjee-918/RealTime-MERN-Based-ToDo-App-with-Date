require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routeTodo = require("./routes/routeTodo");
const routeUser = require("./routes/routeUser");
const PORT = process.env.PORT || 8080

const app = express();

const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://realtime-todo-mongoserver.onrender.com/*",
        methods: ["GET", "POST", "PUT"],
        credentials: true
    }
});

app.use(express.json());
app.use(cors({
    origin: "https://realtime-todo-mongoserver.onrender.com/*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Accept", "X-CSRF-TOKEN", "Authorization"]
}));

const connectDatabase = (module.exports = () => {
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.MONGO_URI, params);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.log(error);
        console.log("DB connection failed!");
    }
})

app.use("/todo", routeTodo);
app.use("/user", routeUser);

server.listen(PORT, () => {
    try {
        console.log('Server running on PORT ' + PORT);
        connectDatabase();
    } catch (err) {
        console.log('Error : ' + err);
    }
}) 

io.on("connection", (sock) => {
    console.log('A user connected with id ' + sock.id);
    sock.on("todo_change", (data) => {
        sock.broadcast.emit("received_todo", data);
    })
    sock.on("disconnect", () => {
        console.log("A user disconnected!");
    })
})