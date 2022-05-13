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
        res.json({msg: "Add session Success! "})
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
        const {titre,description} = req.body

        await Session.findByIdAndUpdate({_id:req.params.id}, {
             titre,description
        })
        res.json({msg: "Update session by id Success!"})
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
       
        res.json({msg: "Session deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= sessionCtrl