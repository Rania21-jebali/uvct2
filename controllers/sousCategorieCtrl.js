const Categorie= require('../models/categorie')
const SousCategorie= require('../models/sousCategorie')


const sousCategorieCtrl = {
//   Ajout sous catégorie
addSousCategorie: async (req, res) => {
    try {
        const {titre} = req.body
        const categorie1 = await Categorie.findOne({titre:req.params.titre})
         const {id} = categorie1.id
        const newSousCategorie = {
            titre , categorie: categorie1.id
        }
        const sousCategorie = new SousCategorie(newSousCategorie);
         await sousCategorie.save();
        res.json({msg: "Add sous-catégorie Success! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All sous catégories
getAllSousCategorie: async (req, res) => {
    try {
        const sousCategorie = await SousCategorie.find({ categorie: req.params.id })
        res.json(sousCategorie)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer sous catégories
deleteSousCategorie: async (req, res) => {
    try {
        await SousCategorie.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Sous Categorie deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
}

module.exports= sousCategorieCtrl