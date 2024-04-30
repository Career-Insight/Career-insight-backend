const mongoose = require('mongoose');

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
})

const RoadMap = mongoose.model('RoadMap', roadMapSchema);

module.exports = RoadMap;