const mongoose= require('mongoose')

const sousCategorieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    categorie:{
        type:Object,
        ref: 'Categorie'
    },
    keywords:{
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