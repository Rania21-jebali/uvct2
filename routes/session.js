const router= require('express').Router()
const sessionCtrl = require('../controllers/sessionCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutSession',auth, sessionCtrl.addSession)

router.get('/allSession/:id',auth,sessionCtrl.getAllSessions)

router.delete('/deleteSession/:id', auth, sessionCtrl.deleteSession)


module.exports=router