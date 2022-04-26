const mongoose= require('mongoose')

const eventSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    details:{
        type:String,
        required: true,
    },
    dateDebut:{
        type: String,
        required: true,
    },
    dateFin: {
        type: String,
        required: true,
    },
    nbTicket: {
        type: String,
        required: true,
    },
    prix: {
        type: String,
        required: true,
    },
    gratuit: {
        type: Boolean,
    },
    typeEvent: {
        type: String,
    },
    affiche: {
        type: String,
        required: true,

    },
    enLigne: {
        type: Boolean,
    },
    surPlace: {
        type: Boolean,
    },
    postedBy:{
        type:Object,
        ref: 'Users'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Event", eventSchema)