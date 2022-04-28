const router= require('express').Router()
const chapitreCtrl = require('../controllers/chapitreCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutchap/:id',auth, chapitreCtrl.addChapitre)

router.get('/allChapitre/:id',auth,chapitreCtrl.getAllChapitres)

router.delete('/deleteChapitre/:id', auth, chapitreCtrl.deleteChapitre)


module.exports=router