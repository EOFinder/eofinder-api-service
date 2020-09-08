const Bookings = require('../models/modelBookings');

module.exports = {
  getAllBookings : async (req, res) => {
    try {
      const bookings = await Bookings.find({})
      .populate({path: 'id_user', select: 'user_name'})
      .populate({path: 'id_event', select: 'event_name'})
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

      if(newBooking){
        res.send({
          message: 'success',
          newBooking,
        })
      } else {
        res.send({
          message:'error'
        })
      }
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
      const getOneBooking = await Bookings.findOne({})
      .populate({path: 'id_user', select: 'user_name'})
      .populate({path: 'id_event', select: 'event_name'})
      
      if(getOneBooking) {
        res.send(200).json({
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