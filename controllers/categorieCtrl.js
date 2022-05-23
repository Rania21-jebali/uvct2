const Categorie= require('../models/categorie')

const categorieCtrl = {
//   Ajout catégorie
addCategorie: async (req, res) => {
    try {
        const {titre,image,description,motCles} = req.body
        const newCategorie = {
            titre , image, description, motCles
        }
        const categorie = new Categorie(newCategorie);
         await categorie.save();
        res.json({msg: "Catégorie ajouté ! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All catégories
getAllCategorie: async (req, res) => {
    try {
        const categorie = await Categorie.find()
        res.json(categorie)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update catégorie by id
updateCategorieById: async (req, res) => {
    try {
        const {titre, image, description, motCles} = req.body

        await Categorie.findByIdAndUpdate({_id:req.params.id}, {
            titre, image, description, motCles
        })
        res.json({msg: "Catégorie modifié !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// get categorie by id
getCategorieById: async (req, res) => {
    try {
        const categorie = await Categorie.findById({_id:req.params.id})
        res.json(categorie)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer catégorie
deleteCategorie: async (req, res) => {
    try {
        await Categorie.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Catégorie supprimé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= categorieCtrl