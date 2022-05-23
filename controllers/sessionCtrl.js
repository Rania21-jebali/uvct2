const Session= require('../models/session')


const sessionCtrl = {
//   Ajout session
addSession: async (req, res) => {
    try {
        const {titre,section} = req.body
        const newSession = {
            titre , section
        }
        const session = new Session(newSession);
         await session.save();
        res.json({msg: "Session ajoutée ! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//get Session by id
getSessionById: async (req, res) => {
    try {
        const session = await Session.findById({ _id:req.params.id})

        res.json(session)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update session by id
updateSessionById: async (req, res) => {
    try {
        const {titre,description,file,article,video} = req.body

        await Session.findByIdAndUpdate({_id:req.params.id}, {
             titre,description,file,article,video
        })
        res.json({msg: "Session modifiée!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All sessions
getAllSessions: async (req, res) => {
    try {
        const session = await Session.find({ section: req.params.id })
        res.json(session)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer session
deleteSession: async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Session supprimée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= sessionCtrl