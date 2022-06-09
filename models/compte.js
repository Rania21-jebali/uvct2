const mongoose= require('mongoose')

const compteSchema = new mongoose.Schema({
    currency:{
        type:String,
    },
    type:{
        type:String,
    },
    country:{
        type:String,
    },
    name:{
        type:String,
    },
    number:{
        type:String,
    },
    exist:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Object,
        ref: 'Users'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Compte", compteSchema)