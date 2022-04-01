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
      //  required: [true, "Please enter your password!"]
    },
    role: {
        type: String,
        default:"user"
    },
    avatar: {
        type: String,
        default:'../avatar/avatarDefault.png'
    }
    ,
    description:{
        type:String
    },
    specialite:{
        type:String
    },
    skills:{
        type:String
    },
    formation:{
        type:String
    },
    cv:{
        type:String,
    },
    status:{
        type:Boolean,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)