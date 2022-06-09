const Categorie= require('../models/categorie')
const SousCategorie= require('../models/sousCategorie')


const sousCategorieCtrl = {
//   Ajout sous catégorie
addSousCategorie: async (req, res) => {
    try {
        const {title,image,description,keywords} = req.body
        const categorie1 = await Categorie.findOne({_id:req.params.id})
         const {id} = categorie1.id
        const newSousCategorie = {
            title , image, description, keywords, categorie: categorie1.id
        }
        const sousCategorie = new SousCategorie(newSousCategorie);
         await sousCategorie.save();
        res.json({msg: "Sous-catégorie ajoutée ! "})
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
//update sous catégorie by id
updateSousCategorieById: async (req, res) => {
    try {
        const {title, image, description,keywords} = req.body

        await SousCategorie.findByIdAndUpdate({_id:req.params.id}, {
            titre, image, description, motCles
        })
        res.json({msg: "Sous catégorie modifiée!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// get sous categorie by id
getSousCategorieById: async (req, res) => {
    try {
        const souscategorie = await SousCategorie.findById({_id:req.params.id})
        res.json(souscategorie)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer sous catégories
deleteSousCategorie: async (req, res) => {
    try {
        await SousCategorie.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Sous Catégorie supprimée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
}

module.exports= sousCategorieCtrl