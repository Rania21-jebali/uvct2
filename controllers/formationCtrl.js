const Formation= require('../models/formation')


const formationCtrl = {
//   Ajout formation
addFormation: async (req, res) => {
    try {
        const {titre} = req.body
        const formation = await Formation.findOne({titre})
        if(formation) return res.status(400).json({msg: "This titre already exists."})
        const newFormation = {
            titre, postedBy:req.user.id
        }
        const formation2 = new Formation(newFormation);
         await formation2.save();
        res.json({msg: "Add formation Success! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  All formations by user
getAllFormations: async (req, res) => {
    try {
        const formation = await Formation.find({ postedBy: req.user.id })
        res.json(formation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update formation
updateFormationByTitre: async (req, res) => {
    try {
        const {titre, discription, affiche, videopromo, categorie, niveau, prix} = req.body

        await Formation.findOneAndUpdate({titre: req.params.titre}, {
            titre, discription, affiche, videopromo, categorie, niveau, prix
        })

        res.json({msg: "Update formation Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer formation
deleteFormation: async (req, res) => {
    try {
        await Formation.findByIdAndDelete(req.params.id)
       
        res.json({msg: "formation deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= formationCtrl