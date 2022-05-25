const mongoose= require('mongoose')

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    remise: {
        type: String,
    },
    nbRemise: {
        type: String,
    },
    dateDebut: {
        type: String,
    },
    dateFin: {
        type: String,
    },
    statut: {
        type: Boolean,
        default:false,
    },
    formation:{
        type:Object,
        ref: 'Formation'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Coupon", couponSchema)