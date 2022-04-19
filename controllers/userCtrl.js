const Users= require('../models/user')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const sendMail= require('./sendMail')
const sendAccept= require('./sendAccept')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const {CLIENT_URL} = process.env
const fetch = require('node-fetch');
const History=require('../models/history')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)



const userCtrl = {
 //Register
 register: async (req, res) => {
    try {
        const {name, email, password} = req.body
        
        if(!name || !email || !password)
            return res.status(400).json({msg: "Please fill in all fields."})

        if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid emails."})

        const user = await Users.findOne({email})
        if(user) return res.status(400).json({msg: "This email already exists."})

        if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = {
            name, email, password: passwordHash
        }
        const user1 = new Users(newUser);
         await user1.save();
/*
        const activation_token = createActivationToken(newUser)

        const url = `${CLIENT_URL}/user/activate/${activation_token}`
        sendMail(email, url, "Verify your email address")
*/

        res.json({msg: "Register Success! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Accept instructeur
AcceptInstr: async (req, res) => {
    try {

      const user=  await Users.findOne({_id: req.params.id})

       // if(!user) return res.status(400).json({msg: "This email does not exist."})

        const access_token = createAccessToken({id: user._id})
        const url = `${CLIENT_URL}/user/acceptInstr/${access_token}`

        sendAccept(user.email, url, "Accéder à votre compte")
        res.json({msg: "Instructeur accepté."})
        

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Register instructeur
registerInstructeur: async (req, res) => {
    try {
        const {name, email,specialite,skills,description,formation} = req.body

       if(!name || !email )
            return res.status(400).json({msg: "Please fill in all fields."})

        if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid emails."})
            
        const newUser = {
            name, email,specialite,skills,description,formation
        }
      
        const user = new Users(newUser);
        user.role="instructeur";
         await user.save();
                res.json({msg: "Candidature envoyée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Activation email
activateEmail: async (req, res) => {
    try {
        const {activation_token} = req.body
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

        const {name, email, password} = user

        const check = await Users.findOne({email})
        if(check) return res.status(400).json({msg:"This email already exists."})

        const newUser = new Users({
            name, email, password
        })

        await newUser.save()

        res.json({msg: "Account has been activated!"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//login
login: async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await Users.findOne({email})

        if(!user) return res.status(400).json({msg: "This email does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

        const refresh_token = createRefreshToken({id: user._id})
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7 days
        }) 

        res.json({msg: "Login success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Access Token
getAccessToken: (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({msg: "Please login now!"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Please login now!"})

            const access_token = createAccessToken({id: user.id})
            res.json({access_token})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Forget Password
forgotPassword: async (req, res) => {
    try {
        const {email} = req.body
        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg: "This email does not exist."})

        const access_token = createAccessToken({id: user._id})
        const url = `${CLIENT_URL}/user/reset/${access_token}`

        sendMail(email, url, "Reset your password")
        res.json({msg: "Re-send the password, please check your email."})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Reset Password
resetPassword: async (req, res) => {
    try {
        const {password} = req.body
        const passwordHash = await bcrypt.hash(password, 12)

        await Users.findOneAndUpdate({_id: req.user.id}, {
            password: passwordHash
        })

        res.json({msg: "Password successfully changed!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

//User information profil
getUserInfor: async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password')

        res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Users All informations Admin
getUsersAllInfor: async (req, res) => {
    try {
        const users = await Users.find({role:"user"}).select('-password')

        res.json(users)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//All candidats informations Admin
getCondAllInfor: async (req, res) => {
    try {
        const users = await Users.find({role:"instructeur", password:null}).select('-password')

        res.json(users)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//All instructeurs informations Admin
getInstrAllInfor: async (req, res) => {
    try {
        const users = await Users.find({role:"instructeur",accept:true})

        res.json(users)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//logout
logout: async (req, res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({msg: "Logged out."})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update user
updateUser: async (req, res) => {
    try {
        const {name, avatar} = req.body
        await Users.findOneAndUpdate({_id: req.user.id}, {
            name, avatar
        })

        res.json({msg: "Update Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update profil instructeur
updateProfilInstr: async (req, res) => {
    try {
        const {name, avatar,tele,site,info} = req.body
        await Users.findOneAndUpdate({_id: req.user.id}, {
            name, avatar,tele,site,info
        })

        res.json({msg: "Update profil instructeur Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update paiement info
updatePaiementInfo: async (req, res) => {
    try {
        const {typeCompte,paysCompte,nomCompte,numCompte} = req.body
        await Users.findOneAndUpdate({_id: req.user.id}, {
            typeCompte,paysCompte,nomCompte,numCompte
        })

        res.json({msg: "Update paiement instructeur Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

//update password instructeur
updatePsswordInstr: async (req, res) => {
    try {
        const {password} = req.body
        
        if(!password)
            return res.status(400).json({msg: "Please fill in all fields."})

        if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

        const passwordHash = await bcrypt.hash(password, 12)
       
        await Users.findOneAndUpdate({_id: req.user.id}, {
            password: passwordHash , accept:true })

        res.json({msg: "Update Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

//Update users role
updateUsersRole: async (req, res) => {
    try {
        const {role} = req.body

        await Users.findOneAndUpdate({_id: req.params.id}, {
            role
        })

        res.json({msg: "Update Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Delete user
deleteUser: async (req, res) => {
    try {
        const {cause} = req.body
        const {idAdmin} =req
        const user= await Users.findById(req.params.id)
        const Useremail= user.email
        const history = new History({cause,Useremail,idAdmin});
        await history.save();
        await Users.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Get History
getHistory: async (req, res) => {
    try {
        const history = await History.find()

        res.json(history)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Google login
googleLogin: async (req, res) => {
    try {
        const {tokenId} = req.body

        const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
        
        const {email_verified, email, name, picture} = verify.payload

        const password = email + process.env.GOOGLE_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

        const user = await Users.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }else{
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture
            })

            await newUser.save()
            
            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Facebook login
facebookLogin: async (req, res) => {
    try {
        const {accessToken, userID} = req.body

        const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
        
        const data = await fetch(URL).then(res => res.json()).then(res => {return res})

        const {email, name, picture} = data

        const password = email + process.env.FACEBOOK_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await Users.findOne({email})

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }else{
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture.data.url
            })

            await newUser.save()
            
            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
}




function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports= userCtrl