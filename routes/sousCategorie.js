const router= require('express').Router()
const sousCategorieCtrl = require('../controllers/sousCategorieCtrl')
const auth = require('../middleware/auth')

router.post('/addsousCateg/:id', sousCategorieCtrl.addSousCategorie)

router.get('/allSousCategorie/:id', sousCategorieCtrl.getAllSousCategorie)

router.get('/souscategorie/:id', sousCategorieCtrl.getSousCategorieById)

router.patch('/updateSousCategorie/:id', sousCategorieCtrl.updateSousCategorieById)

router.delete('/deleteSousCategorie/:id', sousCategorieCtrl.deleteSousCategorie)


module.exports=router