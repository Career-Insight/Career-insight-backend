const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name: String,
    Company_url: String,
    Founded: String,
    Industry: String,
    Size: String,
    Social_Media_Links: [String],
    description: String,
    og_image: String,
    title: String
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;