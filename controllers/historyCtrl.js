const History= require('../models/history')

const historyCtrl = {

// supprimer history
deleteHistory: async (req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id)
       
        res.json({msg: "historie supprimé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Get History
getHistory: async (req, res) => {
    try {
        const history = await History.find()

        res.json(history)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//Get History by admin
getHistoryByAdmin: async (req, res) => {
    try {
        const history = await History.find({idAdmin: req.params.id})

        res.json(history)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= historyCtrl