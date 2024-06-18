const mongoose = require('mongoose');

const TargetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    location: { type: String, required: true },
    sectors: [{ type: String }],
    bio: { type: String, required: true },
    career_links: [{ type: String, required: true }],
    social_media: [{ type: String, required: true }],
    benefits: [{ type: String }],
    programming_languages: [{ type: String, required: true }],
    frontend: [{ type: String, required: true }],
    backend: [{ type: String, required: true }]
});

const Target = mongoose.model('Target', TargetSchema);

module.exports = Target;