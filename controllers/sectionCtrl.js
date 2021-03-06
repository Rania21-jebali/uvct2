const Formation= require('../models/formation')
const Section= require('../models/section')


const sectionCtrl = {
//   Ajout section
addSection: async (req, res) => {
    try {
        const {title,objectif} = req.body
        const formation1 = await Formation.findOne({title:req.params.titre})
         const {id} = formation1.id
        const newSection = {
            title , objectif, formation: formation1.id
        }
        const section2 = new Section(newSection);
         await section2.save();
        res.json({msg: "Section ajoutée ! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get All section
getAllSections: async (req, res) => {
    try {
        const section = await Section.find({ formation: req.params.id })
        res.json(section)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//get Section by id
getSectionById: async (req, res) => {
    try {
        const section = await Section.findById({ _id:req.params.id})

        res.json(section)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update section by id
updateSectionById: async (req, res) => {
    try {
        const {titre , objectif} = req.body

        await Section.findByIdAndUpdate({_id:req.params.id}, {
            title, objectif
        })
        res.json({msg: "Section ajoutée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer section
deleteSection: async (req, res) => {
    try {
        await Section.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Section supprimée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
}

module.exports= sectionCtrl