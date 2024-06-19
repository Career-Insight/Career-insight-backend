const mongoose = require('mongoose');
const User = require('./userModel')
const { sendJobUpdateEmail } = require('../utils/emails')

const jobSchema = new mongoose.Schema({
    job_name: String,
    job_type: [String],
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        //autopopulate: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        //autopopulate: true,
    },
    applyed_people: Number,
    experience: String,
    career_level: String,
    education_level: String,
    gender: String,
    salary_range: Number,
    key_job: String,
    posted_datetime: Date,
    month: Number,
    year: Number,
    country: String,
    job_description: String,
    job_requirements: String,
    skill_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
    }],
});

jobSchema.post('save', async function (doc) {
    try {
        const users = await User.find({});
        users.forEach(user => {
            sendJobUpdateEmail(user);
        });
    } catch (error) {
        console.error('Error sending job update email:', error);
    }
});

//jobSchema.plugin(require('mongoose-autopopulate'))

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;


