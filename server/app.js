const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require('./config/db')

// express app
const app = express();


//DB
dotenv.config({ path: "./config.env"});


//MIDDLEWARES  
app.use(express.json());

//ROUTES
//routes here


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode:${process.env.NODE_ENV}`);
}


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Sever is up on port: ${PORT}`);
});