const router= require('express').Router()
const sousCategorieCtrl = require('../controllers/sousCategorieCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutsousCateg/:titre',auth, sousCategorieCtrl.addSousCategorie)

router.get('/allSousCategorie/:id',auth, sousCategorieCtrl.getAllSousCategorie)

router.delete('/deleteSousCategorie/:id', auth, sousCategorieCtrl.deleteSousCategorie)


module.exports=router