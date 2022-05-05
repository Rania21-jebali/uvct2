const router= require('express').Router()
const categorieCtrl = require('../controllers/categorieCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutcateg',auth, categorieCtrl.addCategorie)

router.get('/allCategorie',auth,categorieCtrl.getAllCategorie)

router.delete('/deleteCategorie/:id', auth, categorieCtrl.deleteCategorie)


module.exports=router