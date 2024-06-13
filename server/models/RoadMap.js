const {mongoose, SchemaTypes} = require('mongoose');

const roadMapSchema = new mongoose.Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    completed:{
        type:Boolean,
        default:false
    },
    learning_plan: {
        type: SchemaTypes.Mixed,
        required: true
    },
}, { timestamps: true })

const RoadMap = mongoose.model('RoadMap', roadMapSchema);

module.exports = RoadMap;