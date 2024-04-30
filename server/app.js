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
const helmet = require('helmet')

require('./config/db')
dotenv.config();


// express app
const app = express();





//MIDDLEWARES  
const notFound = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandlers")
const limiter = require("./middlewares/rateLimiter")
const { authenticationUser } = require("./middlewares/authentication")

//ROUTES
const dummyRouter = require("./routes/dummeyRoute")
const authRouter = require("./routes/authRoutes")
const oauthGoogleRoute = require('./routes/oauthRoute-google')
const dashboardGenral = require('./routes/dashboardRoutes')
const reviewRoutes = require('./routes/reviewsRoutes')
const companyRoutes = require('./routes/compainesRoutes')
const dataRoutes = require('./routes/dataCollectionRoutes')


//API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Application
const MongoStore = connectMongo(session);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet())
app.use(limiter)
app.use(cookieParser(process.env.JWT_SECRET))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store : new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session())
app.use("/api/v1/test",dummyRouter)
app.use("/api/v1/auth",authRouter)
app.use(oauthGoogleRoute)
app.use(authenticationUser)
app.use('/api/v1/interests',dataRoutes)
app.use('/api/v1/dashboard', dashboardGenral)
app.use('/api/v1/review',reviewRoutes)
app.use('/api/v1/company', companyRoutes)
app.use(notFound);
app.use(errorHandlerMiddleware);


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode:${process.env.NODE_ENV}`);
}


module.exports = app;
