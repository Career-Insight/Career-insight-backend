const express = require("express");
const session = require("express-session")
const passport = require('passport');
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json")
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo')
const cors = require('cors');

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
const oauthGoogleRoute = require('./routes/oauthRoute-google')


//API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Application
const MongoStore = connectMongo(session);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store : new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session())
app.use("/api/v1/test",dummyRouter)
app.use("/api/v1/auth",authRouter)
app.use(oauthGoogleRoute)
app.use(notFound);
app.use(errorHandlerMiddleware);


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode:${process.env.NODE_ENV}`);
}


module.exports = app;
