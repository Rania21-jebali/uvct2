const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../middleware/auth')
const uploadFile = require('../middleware/uploadFile')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/upload_cv',uploadFile , uploadCtrl.uploadCV)


module.exports = router