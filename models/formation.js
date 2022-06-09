const mongoose= require('mongoose')

const formationSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    subTitle:{
        type:String
    },
    description:{
        type:String
    },
    categorie: {
        type: String,
    },
    price: {
        type: String,
    },
    level: {
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
    intendedFor: {
        type: String,
    },
    postedBy:{
        type:Object,
        ref: 'Users'
    },
    free:{
        type:Boolean,
        default:false,
    },
    archiver:{
        //archiver
        type:Boolean,
        default:false,
    },
    statut:{
        //publier
        type:Boolean,
        default:false,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Formation", formationSchema)