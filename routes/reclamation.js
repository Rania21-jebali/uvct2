const router= require('express').Router()
const reclamationCtrl= require('../controllers/reclamationCtrl')
const auth = require('../middleware/auth')


router.post('/addReclamation',auth,reclamationCtrl.addReclamation)
router.get('/myReclamation',auth,reclamationCtrl.getReclamation)
router.delete('/deleteReclamation/:id', auth, reclamationCtrl.deleteReclamation)


module.exports=router