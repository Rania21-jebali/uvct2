const Reclamation= require('../models/reclamation')

const reclamationCtrl = {
//   Ajout reclamation
addReclamation: async (req, res) => {
    try {
        const {cause,message} = req.body
        const newReclamation = {
            cause, message, userId:req.user.id,
        }
        const reclamation = new Reclamation(newReclamation);
         await reclamation.save();
        res.json({msg: "Réclamation ajoutée ! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get reclamation
getReclamation: async (req, res) => {
    try {
        const reclamation = await Reclamation.find({ userId: req.user.id })
        res.json(reclamation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get all reclamation
getAllReclamation: async (req, res) => {
    try {
        const reclamation = await Reclamation.find()
        res.json(reclamation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// get reclamation by id
getReclamationById: async (req, res) => {
    try {
        const reclamation = await Reclamation.findById({_id:req.params.id})
        res.json(reclamation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer reclamation
deleteReclamation: async (req, res) => {
    try {
        await Reclamation.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Réclamation supprimée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= reclamationCtrl