const Compte= require('../models/compte')
const Users= require('../models/user')

const compteCtrl = {
//   Ajout compte
addCompte: async (req, res) => {
    try {
        const {devise,typeCompte,paysCompte,nomCompte,numCompte} = req.body
        const newCompte = {
            devise,typeCompte,paysCompte,nomCompte,numCompte,
            userId:req.user.id,
            exist:true
        }
        const compte = new Compte(newCompte);
         await compte.save();
        res.json({msg: " Compte ajouté! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get compte
getCompte: async (req, res) => {
    try {
        const compte = await Compte.find({ userId: req.user.id })
        res.json(compte)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer compte
deleteCompte: async (req, res) => {
    try {
        await Compte.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Compte supprimé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= compteCtrl