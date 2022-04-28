const mongoose= require('mongoose')

const leconSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    file: {
        type: String,
    },
    video: {
        type: String,
    },
    questionnaire: {
        type: String,
    },
    chapitre:{
        type:Object,
        ref: 'Chapitre'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Lecon", leconSchema)