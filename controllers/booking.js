const Bookings = require('../models/modelBookings');
const Users = require('../models/users');
const Events = require('../models/events');

module.exports = {
  getAllBookings : async (req, res) => {
    try {
      const bookings = await Bookings.find()
      .populate({path: 'id_users', select: 'fullname'})
      .populate({path: 'id_events', select: 'title seats'})
      if(bookings){
        res.status(200).json({
          message: 'Success to get All bookings',
          bookings
        })
      } else {
        res.status(400).json({
          message: 'Failed to get all data'
        })
      }
    }
    catch(error){
      console.log(error);
      res.status(500).json({
        message: 'Internal Server error'
      })
    }
  },
  addBooking: async (req, res) => {
    try {
      const newBooking = await Bookings.create({
        ...req.body
      })

        const userBooks = await Users.findOneAndUpdate(
          {_id: req.body.id_users}, 
          {$push: {bookings: newBooking._id}},
          {new: true}
        )
        const eventBooking = await Events.findOneAndUpdate(
          {_id: req.body.id_events}, 
          {$push: {bookings: newBooking._id}},
          {new: true}
        )
        const checkSeats = await Events.findOne({_id: req.body.id_events})
        let seatsUpdate = await checkSeats.seats;
        const updateSeats = await Events.findOneAndUpdate({_id: req.body.id_events}, {seats: seatsUpdate - 1})

      res.status(200).send({
        message: 'success',
        userBooks,
        eventBooking
      })
    }
    catch(error) {
      console.log(error)
      res.send({
        message: 'error'
      })
    }
  },
  getOneBooking: async (req, res) => {
    try{
      const getOneBooking = await Bookings.findOne({_id: req.params.id})
      .populate({path: 'id_users', select: 'fullname'})
      .populate({path: 'id_events', select: 'title seats'})
      
      if(getOneBooking) {
        res.status(200).json({
          message: 'get one booking',
          getOneBooking
        })
      } else {
        res.status(400).json({
          message: 'failed to get data booked'
        })
      }
    }
    catch(error){
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  },
  updateBooking: async (req, res) => {
    try{
      const updateBooking = await Bookings.findOneAndUpdate({_id: req.params.id}, {...req.body})
      if(updateBooking){
        res.status(200).json({
          message: `success update booking with ${req.params.id}`,
        })
      } else {
        res.status(400).json({
          message: `failed edit booking with ${req.params.id}`,
        })
      }
    }
    catch(error){
      res.status(500).json({
        message: `internal server error`,
      })
    }
  },
  deleteBooking: async (req, res) => {
    try{
      const deleteBooking = await Bookings.findOneAndDelete({_id: req.params.id}, {...req.body})
      if(deleteBooking){
        res.status(200).json({
          message: `success delete booking with ${req.params.id}`,
        })
      } else {
        res.status(400).json({
          message: `failed delete booking with ${req.params.id}`,
        })
      }
    }
    catch(error){
      res.status(500).json({
        message: `internal server error`
      })
    }
  }

}