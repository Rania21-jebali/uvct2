const Formation= require('../models/formation')
const Chapitre= require('../models/chapitre')


const chapitreCtrl = {
//   Ajout chapitre
addChapitre: async (req, res) => {
    try {
        const {titre} = req.body
        const formation1 = await Formation.findOne({titre:req.params.titre})
         const {id} = formation1.id
        const newChapitre = {
            titre , formation: formation1.id
        }
        const chapitre2 = new Chapitre(newChapitre);
         await chapitre2.save();
        res.json({msg: "Add chapitre Success! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All chapitre 
getAllChapitres: async (req, res) => {
    try {
        const chapitre = await Chapitre.find({ formation: req.params.id })
        res.json(chapitre)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer chapitre
deleteChapitre: async (req, res) => {
    try {
        await Chapitre.findByIdAndDelete(req.params.id)
       
        res.json({msg: "chapitre deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= chapitreCtrl