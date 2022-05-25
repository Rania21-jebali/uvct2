const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCV = require('../middleware/uploadFile')
const uploadFile = require('../middleware/uploadFile')
const uploadVideo = require('../middleware/uploadVideo')
const uploadCtrl = require('../controllers/uploadCtrl')
const uploadFileCtrl = require('../controllers/uploadFile')
const uploadVideoCtrl = require('../controllers/uploadVideo')
const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/uploadAffiche', uploadImage, auth, uploadCtrl.uploadAffiche)
router.post('/uploadCV', uploadCV, uploadFileCtrl.uploadCV)
router.post('/uploadFile', uploadFile, auth, uploadFileCtrl.uploadFile)
router.post('/uploadVideo', auth, uploadVideoCtrl.uploadVideo)



module.exports = router