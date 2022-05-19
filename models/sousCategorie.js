const mongoose= require('mongoose')

const sousCategorieSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    categorie:{
        type:Object,
        ref: 'Categorie'
    },
    motCles:{
        type: String,
    },
    image:{
        type: String,
    },
    description:{
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("SousCategorie", sousCategorieSchema)