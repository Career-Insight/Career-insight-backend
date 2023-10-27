const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

require('./config/db')
dotenv.config();


// express app
const app = express();


//DB
dotenv.config({ path: "./config.env"});


//MIDDLEWARES  
const notFound = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandlers")

//ROUTES
const dummyRouter = require("./routes/dummeyRoute")
const authRouter = require("./routes/authRoutes")

//Application
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use("/api/v1/test",dummyRouter)
app.use("/api/v1/auth",authRouter)
app.use(notFound);
app.use(errorHandlerMiddleware);


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode:${process.env.NODE_ENV}`);
}


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Sever is up on port: ${PORT}`);
});