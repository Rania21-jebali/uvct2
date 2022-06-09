const router= require('express').Router()
const formationCtrl = require('../controllers/formationCtrl')
const auth = require('../middleware/auth')


router.post('/addFormation',auth,formationCtrl.addFormation)

router.get('/myFormations',auth,formationCtrl.getAllFormations)

router.get('/allFormations',formationCtrl.getAllFormationsAdmin)

router.get('/formations',formationCtrl.getFormations)

router.get('/formationsArchive',formationCtrl.getFormationsArchive)

router.get('/myFormation/:title',auth,formationCtrl.getFormationByTitre)

router.get('/formation/:id',formationCtrl.getFormationById)

router.get('/formations/:categorie',formationCtrl.getFormationsByCategorie)

router.get('/formations/:level',formationCtrl.searchFormationsByLevel)

router.get('/formations/:title',formationCtrl.searchFormationsByTitle)

router.delete('/deleteFormation/:id', auth, formationCtrl.deleteFormation)

router.patch('/updateFormation/:title', auth, formationCtrl.updateFormationByTitre)

router.patch('/updateFormationById/:id', auth, formationCtrl.updateFormationById)

router.patch('/archiveFormation/:id', auth, formationCtrl.archiveFormationById)

router.patch('/publierFormation/:id', auth, formationCtrl.publierFormationById)

router.patch('/depublierFormation/:id', auth, formationCtrl.depublierFormationById)

router.patch('/unarchiveFormation/:id', auth, formationCtrl.unarchiveFormationById)

module.exports=router