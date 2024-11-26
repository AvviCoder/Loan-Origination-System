// The primary setup of the express app for the backend funcitoning;

const express = require("express");
// initailising the express app
const app = express();

const cors = require('cors'); // initialising the cross origin mechanism
app.use(cors());

// loading the process obj
require("dotenv").config();
const connectDB = require("./config/dbconnector");

// establishing the db connection
connectDB();

// using the middleware to parse the json object
app.use(express.json());

// mounting of the routes
const loanRoutes = require("./routes/route");
app.use("/api/v1", loanRoutes);

// initiating the app on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`The app has started to listen on port : ${PORT}`);
})
