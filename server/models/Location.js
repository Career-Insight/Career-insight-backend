const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    job_location: String,
});
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

