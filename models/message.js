const mongoose= require('mongoose')

const messageSchema = new mongoose.Schema({
    objet:{
        type:String,
    },
    message:{
        type:String,
    },
    envoyerPar:{
        type:Object,
        ref: 'Users'
    },
    envoyerA:{
        type:Object,
        ref: 'Users'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Message", messageSchema)