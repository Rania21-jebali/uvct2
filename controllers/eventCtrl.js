const Event= require('../models/event')
const Users= require('../models/user')


const eventCtrl = {
//   Ajout event
addEvent: async (req, res) => {
    try {
        const {titre, details, dateDebut,dateFin,nbTicket,prix,typeEvent,affiche,gratuit,enLigne,surPlace} = req.body
        const newEvent = {
            titre, details, dateDebut,dateFin,nbTicket,prix,typeEvent,affiche,gratuit,enLigne,surPlace,
            postedBy:req.user.id
        }
        const event = new Event(newEvent);
         await event.save();
        res.json({msg: "Add event Success! "})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  All events by user
getAllEvent: async (req, res) => {
    try {
        const event = await Event.find({ postedBy: req.user.id })
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer event
deleteEvent: async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id)
       
        res.json({msg: "event deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= eventCtrl