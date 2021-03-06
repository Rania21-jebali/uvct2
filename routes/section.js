const router= require('express').Router()
const sectionCtrl = require('../controllers/sectionCtrl')
const auth = require('../middleware/auth')

router.post('/ajoutsect/:title',auth, sectionCtrl.addSection)

router.get('/allSection/:id',auth, sectionCtrl.getAllSections)

router.patch('/updatesection/:id', auth, sectionCtrl.updateSectionById)

router.get('/section/:id',auth, sectionCtrl.getSectionById)

router.delete('/deleteSection/:id', auth, sectionCtrl.deleteSection )


module.exports=router