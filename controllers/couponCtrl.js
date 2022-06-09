const Formation= require('../models/formation')
const Coupon= require('../models/coupon')


const couponCtrl = {
//   Ajout coupon
addCoupon: async (req, res) => {
    try {
        const {code, discount, number, dateStart, dateEnd, statut} = req.body
        const formation1 = await Formation.findOne({titre:req.params.titre})
         const {id} = formation1.id
        const newCoupon = {
            code, discount, number, dateStart, dateEnd, statut, formation: formation1.id
        }
        const coupon2 = new Coupon(newCoupon);
         await coupon2.save();
        res.json({msg: "Coupon ajoutée ! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All coupons
getAllCoupons: async (req, res) => {
    try {
        const coupon = await Coupon.find({ formation: req.params.id })
        res.json(coupon)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//get Coupon by id
getCouponById: async (req, res) => {
    try {
        const coupon = await Coupon.findById({ _id:req.params.id})

        res.json(coupon)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update coupon by id
updateCouponById: async (req, res) => {
    try {
        const {code, discount, number, dateStart, dateEnd, statut} = req.body

        await Coupon.findByIdAndUpdate({_id:req.params.id}, {
            code, remise, nbRemise, dateDebut, dateFin, statut
        })
        res.json({msg: "Coupon modifié !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Activer coupon by id
activerCouponById: async (req, res) => {
    try {

        await Coupon.findByIdAndUpdate({_id:req.params.id}, {
            statut:true
        })
        res.json({msg: "Coupon activé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Désactiver coupon by id
desactiverCouponById: async (req, res) => {
    try {

        await Coupon.findByIdAndUpdate({_id:req.params.id}, {
            statut:false
        })
        res.json({msg: "Coupon déactivé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer coupon
deleteCoupon: async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Coupon supprimée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
}

module.exports= couponCtrl