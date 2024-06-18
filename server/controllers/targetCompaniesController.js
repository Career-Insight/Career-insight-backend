const Target = require('../models/Target');
const { StatusCodes } = require("http-status-codes");


const getAllProgrammingLanguages = async (req, res, next) => {
    try {
        const companies = await Target.find({}, 'programming_languages');
        const programmingLanguages = new Set();
        companies.forEach(company => {
            company.programming_languages.forEach(language => {
                programmingLanguages.add(language);
            });
        });
        res.status(StatusCodes.OK).send(Array.from(programmingLanguages));
    } catch (error) {
        next(error);
    }
}

const getAllFrontendTechnologies = async (req, res, next) => {
    try {
        const companies = await Target.find({}, 'frontend');
        const frontendTechnologies = new Set();
        companies.forEach(company => {
            company.frontend.forEach(technology  => {
                frontendTechnologies.add(technology);
            });
        });
        res.status(StatusCodes.OK).send(Array.from(frontendTechnologies));
    } catch (error) {
        next(error);
    }
}

const getAllBackendTechnologies = async (req, res, next) => {
    try {
        const companies = await Target.find({}, 'backend');
        const backendTechnologies = new Set();
        companies.forEach(company => {
            company.backend.forEach(technology  => {
                backendTechnologies.add(technology);
            });
        });
        res.status(StatusCodes.OK).send(Array.from(backendTechnologies));
    } catch (error) {
        next(error);
    }
}

const getTargetCompnies = async (req, res, next) => {
    try {
        const { skills } = req.query;
        if (!skills) {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Skills query parameter is required' });
        }

        const skillsArray = skills.split(',').map(skill => skill.trim());

        const companies = await Target.find({
            $or: [
                { programming_languages: { $in: skillsArray } },
                { frontend: { $in: skillsArray } },
                { backend: { $in: skillsArray } }
            ]
        });

        res.status(StatusCodes.OK).send(companies);
    } catch (error) {
        next(error)
    }
}

const targetCompaniesBasedOnCity = async (req, res, next) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).send({ error: 'City query parameter is required' });
        }

        const companies = await Target.find({
            location: { $regex: new RegExp(city, 'i') }
        });

        res.status(StatusCodes.OK).send(companies);
    } catch (error) {
        next(error)
    }
}


const getCompaniesLocations = async (req, res, next) => {
    try {
        const companies = await Target.find({}, 'location');
        const locations = new Set();
        companies.forEach(company => {
            locations.add(company.location);
        });
        res.status(StatusCodes.OK).send(Array.from(locations));
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProgrammingLanguages,
    getAllFrontendTechnologies,
    getAllBackendTechnologies,
    getTargetCompnies,
    targetCompaniesBasedOnCity,
    getCompaniesLocations
}