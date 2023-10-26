const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


mongoose
    .connect(process.env.MONGO_DB)
    .then((conn) => {
    console.log(`Database connected: ${conn.connection.host}`);
})