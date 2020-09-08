const Events = require('../models/events')

module.exports = {
    getAllEvent: async (req, res) => {
        const events = await Events.find()
        if (events.length > 0) {
            res.status(200).json({ message: 'Get all event data', events })
        } else {
            res.status(500).send(err)
        }
    },
    getOneEvent: async (req, res) => {
        try {
            const event = await Events.findById(req.params.id)
                res.status(200).json({ message: `Event with ID ${event._id} found`, event })
        } catch (err) {
            res.status(500).json({ message: 'Event not found' })
        }
      },
    createEvent: async (req, res) => {
        try {
            const event = new Events(req.body);
            await event.save();
            res.status(200).json({ message: 'Event has been created successfully', event })
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