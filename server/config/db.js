const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


mongoose
    .connect(process.env.MONGO_DB, {
        dbName:process.env.DATABASE_NAME
    })
    .then((conn) => {
    console.log(`Database connected: ${conn.connection.host}`);
    }).catch((err)=> {
        console.log(`Error while connecting to Database ${err}`);
    })