const mongoose= require('mongoose')

const historySchema = new mongoose.Schema({
    action: {
        type: String,
        default:"supprimer"
    },
    cause:{
        type:String
    },
    idAdmin:{
        type:Object,
        ref: 'Users'
    },
    
    Useremail: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("History", historySchema)