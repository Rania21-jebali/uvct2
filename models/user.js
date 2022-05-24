const { chat_v1 } = require('googleapis')
const { file } = require('googleapis/build/src/apis/file')
const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default:"user"
    },
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/dwofvitkq/image/upload/v1649367599/avatar/user_ofqjtg.png"
    }
    ,
    message:{
        type:String
    },
    specialite:{
        type:String
    },
    cv:{
        type:String
    },
    accept:{
        type:Boolean,
        default:false,
    },
    tele:{
        type:String,
    },
    statut:{
        type:String,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)