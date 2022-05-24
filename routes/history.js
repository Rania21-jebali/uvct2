const router= require('express').Router()
const historyCtrl= require('../controllers/historyCtrl')
const auth = require('../middleware/auth')


router.delete('/deleteHistory/:id', auth, historyCtrl.deleteHistory)

router.get('/history/:id', historyCtrl.getHistoryByAdmin)


module.exports=router