const router= require('express').Router()
const leconCtrl = require('../controllers/leconCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutLecon/:id',auth, leconCtrl.addLecon)

router.get('/allLecon/:id',auth,leconCtrl.getAllLecons)

router.delete('/deleteLecon/:id', auth, leconCtrl.deleteLecon)


module.exports=router