const router= require('express').Router()
const eventCtrl= require('../controllers/eventCtrl')
const auth = require('../middleware/auth')


router.post('/addEvent',auth,eventCtrl.addEvent)

router.get('/myEvents',auth,eventCtrl.getAllEvent)

router.get('/myArchiveEvents',auth,eventCtrl.getAllArchiveEvent)

router.get('/events',eventCtrl.getAllEvents)

router.get('/archiveEvents',eventCtrl.getArchiveEvents)

router.get('/event/:id',eventCtrl.getEventById)

router.patch('/updateEvent/:id',auth,eventCtrl.updateEventById)

router.patch('/archiveEvent/:id', auth, eventCtrl.archiveEventById)

router.patch('/unarchiveEvent/:id', auth, eventCtrl.unarchiveEventById)

router.delete('/deleteEvent/:id', auth, eventCtrl.deleteEvent)



module.exports=router