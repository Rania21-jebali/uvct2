const router= require('express').Router()
const compteCtrl= require('../controllers/compteCtrl')
const auth = require('../middleware/auth')


router.post('/addcompte',auth,compteCtrl.addCompte)
router.get('/myCompte',auth,compteCtrl.getCompte)
router.delete('/deleteCompte/:id', auth, compteCtrl.deleteCompte)


module.exports=router