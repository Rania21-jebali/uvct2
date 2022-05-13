const router= require('express').Router()
const sessionCtrl = require('../controllers/sessionCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutSession',auth, sessionCtrl.addSession)

router.patch('/updateSession/:id', auth, sessionCtrl.updateSessionById)

router.get('/allSession/:id',auth,sessionCtrl.getAllSessions)

router.get('/session/:id',auth, sessionCtrl.getSessionById)

router.delete('/deleteSession/:id', auth, sessionCtrl.deleteSession)


module.exports=router