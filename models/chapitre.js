const mongoose= require('mongoose')

const chapitreSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    description:{
        type:String
    },
    file: {
        type: String,
    },
    questionnaire: {
        type: String,
    },
    postedBy:{
        type:Object,
        ref: 'Users'
    },
    formation:{
        type:Object,
        ref: 'Formation'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Chapitre", chapitreSchema)