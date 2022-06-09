const mongoose= require('mongoose')

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    objectif: {
        type: String,
    },
    formation:{
        type:Object,
        ref: 'Formation'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Sections", sectionSchema)