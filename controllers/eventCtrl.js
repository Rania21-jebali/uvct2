const { EventAvailable } = require('@material-ui/icons')
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
        res.json({msg: "Événement ajouté! "})
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
// get event by id
getEventById: async (req, res) => {
    try {
        const event = await Event.findById({_id:req.params.id})
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  All events 
getAllEvents: async (req, res) => {
    try {
        const event = await Event.find()
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// supprimer event
deleteEvent: async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id)
       
        res.json({msg: "Événement supprimé!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//update event by id
updateEventById: async (req, res) => {
    try {
        const {titre, details, dateDebut,dateFin,nbTicket,prix,typeEvent,affiche,gratuit,enLigne,surPlace} = req.body

        await Event.findByIdAndUpdate({_id:req.params.id}, {
            titre, details, dateDebut,dateFin,nbTicket,prix,typeEvent,affiche,gratuit,enLigne,surPlace
        })
        res.json({msg: "Événement modifié !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= eventCtrl