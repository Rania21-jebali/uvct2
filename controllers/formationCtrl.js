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
        res.json({msg: "Formation ajoutée ! "})
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
// get All formations
getFormations: async (req, res) => {
    try {
        const formation = await Formation.find()
        res.json(formation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// get event by id
getFormationById: async (req, res) => {
    try {
        const formation = await Event.findById({_id:req.params.id})
        res.json(formation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  All formations for admin
getAllFormationsAdmin: async (req, res) => {
    try {
        const formation = await Formation.find()
        res.json(formation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update formation by titre
updateFormationByTitre: async (req, res) => {
    try {
        const {titre, sousTitre,description, affiche, videopromo, categorie, niveau, 
            prix, gratuit,objectif,destinerA,prerequis} = req.body

        await Formation.findOneAndUpdate({titre: req.params.titre}, {
            titre,sousTitre, description, affiche, videopromo, categorie, niveau,
             prix, gratuit,objectif,destinerA,prerequis
        })
        res.json({msg: "Formation modifiée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update formation by id
updateFormationById: async (req, res) => {
    try {
        const {titre, description, affiche, videopromo, categorie, niveau, prix, gratuit} = req.body

        await Formation.findByIdAndUpdate({_id:req.params.id}, {
            titre, description, affiche, videopromo, categorie, niveau, prix, gratuit
        })
        res.json({msg: "Formation modifiée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//get Formation by id
getFormationById: async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id)

        res.json(formation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//get Formation by title
getFormationByTitre: async (req, res) => {
    try {
        const formation = await Formation.findOne({titre:req.params.titre})

        res.json(formation)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer formation
deleteFormation: async (req, res) => {
    try {
        await Formation.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Formation supprimée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= formationCtrl