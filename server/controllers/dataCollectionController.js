const User = require('../models/userModel')
const { StatusCodes } = require("http-status-codes");



const addDataCollection = async (req, res, next) => {
    try {
        const id = req.user.userId
        const { interestedJob, interestedSkills, careerLevel } = req.body;

        const user = await User.findOneAndUpdate(
            { _id: id }, 
            { $set: { 
                dataCollection: {
                    interestedJob,
                    interestedSkills,
                    careerLevel
                }
            }},
            { new: true }
        );


        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'user not found' });
        }

        return res.status(StatusCodes.OK).json({ message: 'Data collection updated successfully' });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    addDataCollection
}