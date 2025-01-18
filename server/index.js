const dotenv = require("dotenv");
const express = require("express");
const client = require ("../config/redis");

// client.connect(
//     () => console.log("Redis client connected")
// ).catch(console.error);

const app = express();

const connectDB = require("../config/dbConnection");

connectDB();

// routes 

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/api/v1/user', require('../routes/userRoutes'));


// create server

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
dotenv.config();