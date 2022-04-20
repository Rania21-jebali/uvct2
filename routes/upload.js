const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCV = require('../middleware/uploadFile')
const uploadCtrl = require('../controllers/uploadCtrl')
const uploadFileCtrl = require('../controllers/uploadFile')
const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/uploadAffiche', uploadImage, auth, uploadCtrl.uploadAffiche)
router.post('/upload', uploadCV, uploadFileCtrl.uploadFile)

module.exports = router