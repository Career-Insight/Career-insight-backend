const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name: String,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;