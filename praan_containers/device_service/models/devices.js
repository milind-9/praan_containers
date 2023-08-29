const mongoose = require('mongoose')
const deviceSchema = mongoose.Schema({
    w:{
        type: String
    },
    p: {
        type: Date,
        default: new Date(),
    },
    device:{
        type: String
    },
    h:{
        type: String
    },
    p1:{
        type: String
    },
    p25:{
        type: String
    },
    p10:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
})

module.exports = mongoose.model("Device",deviceSchema)
