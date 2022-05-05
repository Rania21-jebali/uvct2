const mongoose= require('mongoose')

const categorieSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Categorie", categorieSchema)