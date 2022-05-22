const Message= require('../models/message')

const messageCtrl = {
//   envoyer message
envoyerMessage: async (req, res) => {
    try {
        const {objet, message} = req.body
        const newMessage = {
             message, envoyerPar:req.user.id, envoyerA:req.params.id
        }
        const message1 = new Message(newMessage);
         await message1.save();
        res.json({msg: " Message envoyé ! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get message recu
getMessageRecu: async (req, res) => {
    try {
        const message1 = await Message.find({ envoyerA: req.user.id })
        res.json(message1)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get all messages
getAllMyMessages: async (req, res) => {
    try {
        const message1 = await Message.find()
        res.json(message1)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// get message by id
getMessageById: async (req, res) => {
    try {
        const message1 = await Message.findById({_id:req.params.id})
        res.json(message1)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer message
deleteMessage: async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Message supprimé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= messageCtrl