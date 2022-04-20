const router= require('express').Router()
const eventCtrl= require('../controllers/eventCtrl')
const auth = require('../middleware/auth')


router.post('/addEvent',auth,eventCtrl.addEvent)
router.get('/myEvents',auth,eventCtrl.getAllEvent)



module.exports=router