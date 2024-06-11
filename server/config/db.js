const mongoose = require("mongoose");
const dotenv = require('dotenv')
//dotenv.config({path: './development.env'})
//dotenv.config({path: './production.env'})


if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: './production.env' });
} else {
    dotenv.config({ path: './development.env' });
}

console.log("NODE_ENV:", process.env.NODE_ENV);


let dbURI;

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGO_DB_PROD;
} else {
    dbURI = process.env.MONGO_DB_DEV;
}

console.log("dbURI:", dbURI);

mongoose
    .connect(dbURI, {
        dbName:process.env.DATABASE_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((conn) => {
    console.log(`Database connected: ${conn.connection.host}`);
    }).catch((err)=> {
        console.log(`Error while connecting to Database ${err}`);
    })