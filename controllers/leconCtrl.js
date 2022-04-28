const Lecon= require('../models/lecon')


const leconCtrl = {
//   Ajout lecon
addLecon: async (req, res) => {
    try {
        const {titre} = req.body
        const newLecon = {
            titre , chapitre: req.params.id
        }
        const lecon = new Lecon(newLecon);
         await lecon.save();
        res.json({msg: "Add lecon Success! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All lecons
getAllLecons: async (req, res) => {
    try {
        const lecon = await Lecon.find({ chapitre: req.params.id })
        res.json(lecon)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer lecon
deleteLecon: async (req, res) => {
    try {
        await Lecon.findByIdAndDelete(req.params.id)
       
        res.json({msg: "lecon deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= leconCtrl