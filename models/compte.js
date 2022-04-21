const mongoose= require('mongoose')

const compteSchema = new mongoose.Schema({
    devise:{
        type:String,
        default:"TND"
    },
    typeCompte:{
        type:String,
        default:"Compte bancaire"
    },
    paysCompte:{
        type:String,
        default:"Tunisie"
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