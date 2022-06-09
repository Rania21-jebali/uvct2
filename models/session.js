const mongoose= require('mongoose')

const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    article: {
        type: String,
    },
    file: {
        type: String,
    },
    video: {
        type: String,
    },
    section:{
        type:String,
        ref: 'Sections'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Session", sessionSchema)