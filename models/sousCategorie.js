const mongoose= require('mongoose')

const sousCategorieSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    categorie:{
        type:Object,
        ref: 'Categorie'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("SousCategorie", sousCategorieSchema)