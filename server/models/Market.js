const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
    track: {
        type: String,
        required: true,
        unique: true
    },
    skills: {
        type: Map,
        of: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Market = mongoose.model('Market', marketSchema);

module.exports = Market;