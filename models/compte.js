const mongoose= require('mongoose')

const compteSchema = new mongoose.Schema({
    devise:{
        type:String,
    },
    typeCompte:{
        type:String,
    },
    paysCompte:{
        type:String,
    },
    nomCompte:{
        type:String,
    },
    numCompte:{
        type:String,
    },
    userId:{
        type:Object,
        ref: 'Users'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Compte", compteSchema)