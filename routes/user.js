const router= require('express').Router()
const userCtrl= require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register',userCtrl.register)

router.post('/registerInstr',userCtrl.registerInstructeur)

router.post('/registerAdmin',auth,userCtrl.registerAdmin)

router.post('/activation',userCtrl.activateEmail)

router.post('/login',userCtrl.login)

router.post('/refresh_token',userCtrl.getAccessToken)

router.post('/forgot',userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)

router.post('/acceptInstr/:id',auth,  userCtrl.AcceptInstr)

router.get('/all_infor', auth, userCtrl.getUsersAllInfor)

router.get('/allCond', auth, userCtrl.getCondAllInfor)

router.get('/allAdmin', auth, userCtrl.getAdminAllInfor)

router.get('/allInstr', auth, userCtrl.getInstrAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/updateInstr', auth, userCtrl.updateProfilInstr)

router.patch('/updatePasswordInstr', auth,userCtrl.updatePsswordInstr)

router.patch('/update_role/:id', auth, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, userCtrl.deleteUser)

router.get('/history', auth, userCtrl.getHistory)


// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


module.exports=router