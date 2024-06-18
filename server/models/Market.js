const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
    JavaScript: { type: String },
    React: { type: String },
    "Node.js": { type: String },
    CSS: { type: String },
    HTML: { type: String },
    TypeScript: { type: String },
    Java: { type: String },
    Python: { type: String },
    SQL: { type: String },
    Ruby: { type: String },
    Docker: { type: String },
    Kubernetes: { type: String },
    AWS: { type: String },
    Terraform: { type: String },
    "CI/CD": { type: String },
    R: { type: String },
    "Machine Learning": { type: String },
    "Data Visualization": { type: String }
}, { _id: false });

const jobCategorySchema = new mongoose.Schema({
    skills: skillsSchema,
    Date: { type: Date, required: true }
}, { _id: false });

const marketSchema = new mongoose.Schema({
    full_stack: { type: jobCategorySchema },
    front_end: { type: jobCategorySchema },
    back_end: { type: jobCategorySchema },
    DevOps: { type: jobCategorySchema },
    Data_Scientist: { type: jobCategorySchema }
}, { strict: false });

const Market = mongoose.model('Market', marketSchema);

module.exports = Market;