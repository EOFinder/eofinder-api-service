const Events = require('../models/events')
const Users = require('../models/users');

module.exports = {
    getAllEvent: async (req, res) => {
        const events = await Events.find()
        .populate({path: 'posted_by', select: 'fullname'})

        if (events.length > 0) {
            res.status(200).json({ message: 'Get all event data', events })
        } else {
            res.status(500).send(err)
        }
    },
    getOneEvent: async (req, res) => {
        try {
            const event = await Events.findById(req.params.id)
            .populate({path: 'posted_by', select: 'fullname'})

                res.status(200).json({ message: `Event with ID ${event._id} found`, event })
        } catch (err) {
            res.status(500).json({ message: 'Event not found' })
        }
      },
    createEvent: async (req, res) => {
        try {
            const newEvent = await Events.create({
                ...req.body
            })

            const userEventUpdate = await Users.findOneAndUpdate(
                {_id: req.body.posted_by},
                {$push: {events: newEvent._id}},
                {new: true}
            )
            console.log(userEventUpdate);
            res.status(200).json({ message: 'Event has been created successfully', userEventUpdate })
        } catch (err) {
            res.status(500).send(err)
        }
    },
    updateEvent: async (req, res) => {
        try {
            // const event = await Events.findByIdAndUpdate(req.params.id, req.body)
            const { title, description, categories, seats, image, date } = req.body
            const event = await Events.updateOne(
                { _id: req.params.id },
                {
                    title: title,
                    description: description,
                    categories: categories,
                    seats: seats,
                    image: image,
                    date: date
                },
                { runValidators: true }
            )
            res.status(200).json({ message: 'Event has been updated successfully' })

        } catch (err) {
            res.status(500).send(err)
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const event = await Events.findByIdAndDelete(req.params.id)
            if (!event) {
                res.send({
                    message: 'Failed'
                })
            } else {
                res.send({ message: 'Event has been deleted successfully' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Event not found' })
        }
    }
}