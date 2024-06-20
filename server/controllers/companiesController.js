const Company = require('../models/Company');
const { StatusCodes } = require("http-status-codes");

//get company data by it's name 
const getCompanyByName = async (req, res, next) => {
    const company_name = req.query.company_name;
    const companyExists = await Company.exists({company_name: { $eq: company_name }});
        if (!companyExists) {
            return res.send('Company not found');
        }
    await Company.findOne({company_name: { $eq: company_name }})
        .then(company => {
            res.json(company);
        })
        .catch(error => {
            next(error);
        })
}

const getAllCompaniesNameandId = async (req, res , next) => {
    try {
        const compaines = await Company.find({},'company_name _id')
        res.status(StatusCodes.OK).json(compaines);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCompaniesNameandId,
    getCompanyByName
}