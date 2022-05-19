const Reclamation= require('../models/reclamation')

const reclamationCtrl = {
//   Ajout reclamation
addReclamation: async (req, res) => {
    try {
        const {cause,details} = req.body
        const newReclamation = {
            cause, details, userId:req.user.id,
        }
        const reclamation = new Reclamation(newReclamation);
         await reclamation.save();
        res.json({msg: "Add reclamation Success! "})
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
// supprimer reclamation
deleteReclamation: async (req, res) => {
    try {
        await Reclamation.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Reclamation deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= reclamationCtrl