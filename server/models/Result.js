const mongoose = require("mongoose");

const resultschema = new mongoose.Schema({
    programming_languages_distribution: {
        type: Map,
        of: Number
    },
    frontend_technologies_distribution: {
        type: Map,
        of: Number
    },
    backend_technologies_distribution: {
        type: Map,
        of: Number
    },
    offerings_distribution: {
        type: Map,
        of: Number
    }
})

const Result = mongoose.model("Result", resultschema);
module.exports = Result;

