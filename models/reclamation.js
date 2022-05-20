const mongoose= require('mongoose')

const reclamationSchema = new mongoose.Schema({
    cause:{
        type:String,
    },
    message:{
        type:String,
    },
    userId:{
        type:Object,
        ref: 'Users'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Reclamation", reclamationSchema)