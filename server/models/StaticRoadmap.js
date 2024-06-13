const {mongoose, SchemaTypes} = require('mongoose');

const staticRoadmapSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    RoadMap: {
        type: SchemaTypes.Mixed,
        required: true
    },
}, { timestamps: true })

const StaticRoadmap = mongoose.model('StaticRoadmap', staticRoadmapSchema);

module.exports = StaticRoadmap;