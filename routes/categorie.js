const router= require('express').Router()
const categorieCtrl = require('../controllers/categorieCtrl')
const auth = require('../middleware/auth')

router.post('/addcateg', categorieCtrl.addCategorie)

router.get('/allCategorie', categorieCtrl.getAllCategorie)

router.get('/categorie/:id', categorieCtrl.getCategorieById)

router.patch('/updateCategorie/:id', categorieCtrl.updateCategorieById)

router.delete('/deleteCategorie/:id', categorieCtrl.deleteCategorie)


module.exports=router