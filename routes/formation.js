const router= require('express').Router()
const formationCtrl = require('../controllers/formationCtrl')
const auth = require('../middleware/auth')


router.post('/addFormation',auth,formationCtrl.addFormation)

router.get('/myFormations',auth,formationCtrl.getAllFormations)

router.delete('/deleteFormation/:id', auth, formationCtrl.deleteFormation)

router.patch('/updateFormation/:titre', auth, formationCtrl.updateFormationByTitre)




module.exports=router