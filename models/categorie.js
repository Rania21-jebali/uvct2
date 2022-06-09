const mongoose= require('mongoose')

const categorieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    keywords: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Categorie", categorieSchema)