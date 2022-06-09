const mongoose= require('mongoose')

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    discount: {
        type: String,
    },
    number: {
        type: String,
    },
    dateStart: {
        type: String,
    },
    dateEnd: {
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