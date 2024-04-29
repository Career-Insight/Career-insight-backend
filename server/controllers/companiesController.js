const Company = require('../models/Company');

//get company data by it's name 
const getCompanyByName = async (req, res, next) => {
    const company_name = req.query.company_name;
    const companyExists = await Company.exists({ company_name });
        if (!companyExists) {
            return res.send('Company not found');
        }
    await Company.findOne({ company_name })
        .then(company => {
            res.json(company);
        })
        .catch(error => {
            next(error);
        })
}

module.exports = {
    getCompanyByName
}