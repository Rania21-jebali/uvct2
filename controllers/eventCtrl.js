const { EventAvailable } = require('@material-ui/icons')
const Event= require('../models/event')
const Users= require('../models/user')


const eventCtrl = {
//   Ajout event
addEvent: async (req, res) => {
    try {
        const {title, details, dateStart,dateEnd,nbTicket,price,typeEvent,affiche,free,online} = req.body
        const newEvent = {
            title, details, dateStart,dateEnd,nbTicket,price,typeEvent,affiche,free,online,
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
        const event = await Event.find({ postedBy: req.user.id , statut:false})
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  Search All events by title
searchAllEventByTitle: async (req, res) => {
    try {
        const event = await Event.find({ title:req.params.title, statut:false})
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  Search All events by date
searchAllEventByDate: async (req, res) => {
    try {
        const event = await Event.find({ dateStart:req.params.dateStart, statut:false})
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  All archive events by user
getAllArchiveEvent: async (req, res) => {
    try {
        const event = await Event.find({ postedBy: req.user.id , statut:true})
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
        const event = await Event.find({statut:false})
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
//  get archive events 
getArchiveEvents: async (req, res) => {
    try {
        const event = await Event.find({statut:true})
        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// archiver event by id
archiveEventById: async (req, res) => {
    try {
        await Event.findByIdAndUpdate({_id:req.params.id}, {
            statut:true
        })
        res.json({msg: "Event archivée !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
// unarchiver event by id
unarchiveEventById: async (req, res) => {
    try {
        await Event.findByIdAndUpdate({_id:req.params.id}, {
            statut:false
        })
        res.json({msg: "Event unarchivée !"})
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
        const {title, details, dateStart,dateEnd,nbTicket,price,typeEvent,affiche,free,online} = req.body

        await Event.findByIdAndUpdate({_id:req.params.id}, {
            title, details, dateStart,dateEnd,nbTicket,price,typeEvent,affiche,free,online
        })
        res.json({msg: "Événement modifié !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}


module.exports= eventCtrl