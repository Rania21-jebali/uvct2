const mongoose= require('mongoose')

const eventSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    details:{
        type:String
    },
    dateDebut:{
        type: String,
    },
    dateFin: {
        type: String,
    },
    nbTicket: {
        type: String,
    },
    prix: {
        type: String,
    },
    typeEvent: {
        type: String,
    },
    affiche: {
        type: String,
    },
    postedBy:{
        type:Object,
        ref: 'Users'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Event", eventSchema)