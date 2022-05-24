const router= require('express').Router()
const formationCtrl = require('../controllers/formationCtrl')
const auth = require('../middleware/auth')


router.post('/addFormation',auth,formationCtrl.addFormation)

router.get('/myFormations',auth,formationCtrl.getAllFormations)

router.get('/allFormations',formationCtrl.getAllFormationsAdmin)

router.get('/formations',formationCtrl.getFormations)

router.get('/formationsArchive',formationCtrl.getFormationsArchive)

router.get('/myFormation/:titre',auth,formationCtrl.getFormationByTitre)

router.get('/formation/:id',formationCtrl.getFormationById)

router.get('/formations/:categorie',formationCtrl.getFormationsByCategorie)

router.delete('/deleteFormation/:id', auth, formationCtrl.deleteFormation)

router.patch('/updateFormation/:titre', auth, formationCtrl.updateFormationByTitre)

router.patch('/updateFormationById/:id', auth, formationCtrl.updateFormationById)

router.patch('/archiveFormation/:id', auth, formationCtrl.archiveFormationById)

router.patch('/unarchiveFormation/:id', auth, formationCtrl.unarchiveFormationById)

module.exports=router