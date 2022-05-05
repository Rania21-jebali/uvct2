const Categorie= require('../models/categorie')

const categorieCtrl = {
//   Ajout catégorie
addCategorie: async (req, res) => {
    try {
        const {titre} = req.body
        const newCategorie = {
            titre 
        }
        const categorie = new Categorie(newCategorie);
         await categorie.save();
        res.json({msg: "Add catégorie Success! "})
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
// supprimer catégorie
deleteCategorie: async (req, res) => {
    try {
        await Categorie.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Catégorie deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= categorieCtrl