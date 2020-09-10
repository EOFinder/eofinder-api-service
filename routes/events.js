const route = require("express").Router();

const {
    getAllEvent,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getPendingEvents,
    getAcceptedEvents
} = require('../controllers/events')

route.get('/events', getAllEvent)
route.get('/events/pending', getPendingEvents)
route.get('/events/accepted', getAcceptedEvents)
route.get('/events/:id', getOneEvent)
route.post('/events/create', createEvent)
route.put('/events/update/:id', updateEvent)
route.delete('/events/delete/:id', deleteEvent)

module.exports = route