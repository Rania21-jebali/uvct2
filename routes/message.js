const router= require('express').Router()
const messageCtrl= require('../controllers/messageCtrl')
const auth = require('../middleware/auth')


router.post('/envoyerMessage/:id',auth, messageCtrl.envoyerMessage)

router.get('/messageRecu',auth, messageCtrl.getMessageRecu)

router.get('/mesMessages',auth, messageCtrl.getAllMyMessages)

router.get('/message/:id',auth, messageCtrl.getMessageById)

router.delete('/deleteMessage/:id', auth, messageCtrl.deleteMessage)


module.exports=router