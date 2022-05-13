const mongoose= require('mongoose')

const sessionSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    description: {
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