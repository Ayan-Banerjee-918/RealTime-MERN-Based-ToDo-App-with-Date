require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routeTodo = require("./routes/routeTodo");
const routeUser = require("./routes/routeUser");
const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(process.env.PORT, () => {
    try {
        console.log('Server running on PORT ' + process.env.PORT);
        connectDatabase();
    } catch (err) {
        console.log('Error : ' + err);
    }
}) 