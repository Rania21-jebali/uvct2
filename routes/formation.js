const router= require('express').Router()
const formationCtrl = require('../controllers/formationCtrl')
const auth = require('../middleware/auth')


router.post('/addFormation',auth,formationCtrl.addFormation)

router.get('/myFormations',auth,formationCtrl.getAllFormations)

router.get('/allFormations',auth,formationCtrl.getAllFormationsAdmin)

//router.get('/myFormation/:id',auth,formationCtrl.getFormationById)

router.get('/myFormation/:titre',auth,formationCtrl.getFormationByTitre)

router.delete('/deleteFormation/:id', auth, formationCtrl.deleteFormation)

router.patch('/updateFormation/:titre', auth, formationCtrl.updateFormationByTitre)

router.patch('/updateFormationById/:id', auth, formationCtrl.updateFormationById)




module.exports=router