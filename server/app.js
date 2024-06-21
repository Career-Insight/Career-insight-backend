const express = require("express");
const session = require("express-session")
const passport = require('passport');
const dotenv = require("dotenv");
const morgan = require("morgan");
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
const ciChat = require('./routes/ci-chat-route')
const staticRoadmapRoutes = require('./routes/staticRoadmapsRoutes')
const roadmapRoutes = require('./routes/roadmapRoutes')
const targetCompaniesRoutes = require('./routes/targetCompaniesRoutes')




//API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Application
const MongoStore = connectMongo(session);
const corsOptions = {
    origin: ['https://career-insight.me'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet())
app.use(limiter)
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
app.use('/api/v1/ci-chat', ciChat)
app.use('/api/v1/static-roadmaps',staticRoadmapRoutes)
app.use('/api/v1/roadmaps',roadmapRoutes)
app.use('/api/v1/target-companies',targetCompaniesRoutes)
app.use(notFound);
app.use(errorHandlerMiddleware);


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode:${process.env.NODE_ENV}`);
}


module.exports = app;
