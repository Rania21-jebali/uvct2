const router= require('express').Router()
const userCtrl= require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post('/register',userCtrl.register)

router.post('/registerInstr',userCtrl.registerInstructeur)

router.post('/activation',userCtrl.activateEmail)

router.post('/login',userCtrl.login)

router.post('/refresh_token',userCtrl.getAccessToken)

router.post('/forgot',userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)

router.post('/acceptInstr/:id',auth, authAdmin, userCtrl.AcceptInstr)

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)

router.get('/allInstr', auth, authAdmin, userCtrl.getInstrAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/updatePasswordInstr', auth,userCtrl.updatePsswordInstr)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

//router.get('/userInfo/:id', auth, authAdmin, userCtrl.getUserInfor)

// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


module.exports=router