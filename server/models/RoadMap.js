const {mongoose, SchemaTypes} = require('mongoose');

const roadMapSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed:{
        type:Boolean,
        default:false
    },
    RoadMap: {
        type: SchemaTypes.Mixed,
        required: true
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    static_roadmap_id: {
        type: SchemaTypes.ObjectId,
        ref: 'StaticRoadmap',
        required: false
    }
}, { timestamps: true })

const userRoadMap = mongoose.model('userRoadMap', roadMapSchema);

module.exports = userRoadMap;