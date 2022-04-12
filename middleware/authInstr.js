const Users = require('../models/user')

const authInstr = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== "instructeur") 
            return res.status(500).json({msg: "Instructeur resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authInstr
