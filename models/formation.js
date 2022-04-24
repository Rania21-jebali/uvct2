const mongoose= require('mongoose')

const formationSchema = new mongoose.Schema({
    titre: {
        type: String,
        unique: true,
        trim: true
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
    postedBy:{
        type:Object,
        ref: 'Users'
    },
    gratuit:{
        type:Boolean,
        default:false,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Formation", formationSchema)