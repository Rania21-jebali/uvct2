const mongoose= require('mongoose')

const formationSchema = new mongoose.Schema({
    titre: {
        type: String,
        unique: true,
        trim: true
    },
    sousTitre:{
        type:String
    },
    description:{
        type:String
    },
    categorie: {
        type: String,
    },
    prix: {
        type: String,
    },
    niveau: {
        type: String,
    },
    videopromo: {
        type: String,
    },
    affiche: {
        type: String,
    },
    objectif: {
        type: String,
    },
    prerequis: {
        type: String,
    },
    destinerA: {
        type: String,
    },
    postedBy:{
        type:Object,
        ref: 'Users'
    },
    gratuit:{
        type:Boolean,
        default:false,
    },
    statut:{
        type:Boolean,
        default:false,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Formation", formationSchema)