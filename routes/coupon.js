const router= require('express').Router()
const couponCtrl = require('../controllers/couponCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutCoupon/:titre',auth, couponCtrl.addCoupon)

router.get('/allCoupon/:id',auth, couponCtrl.getAllCoupons)

router.patch('/updateCoupon/:id', auth, couponCtrl.updateCouponById)

router.patch('/activerCoupon/:id', auth, couponCtrl.activerCouponById)

router.patch('/desactiverCoupon/:id', auth, couponCtrl.desactiverCouponById)

router.get('/coupon/:id',auth, couponCtrl.getCouponById)

router.delete('/deleteCoupon/:id', auth, couponCtrl.deleteCoupon)


module.exports=router