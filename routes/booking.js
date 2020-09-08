const route = require('express').Router();


const{
  getAllBookings,
  addBooking,
  getOneBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/booking')


route.get('/bookings', getAllBookings)
route.post('/bookings', addBooking)
route.get('/bookings/:id', getOneBooking)
route.put('/bookings/update/:id', updateBooking)
route.delete('bookings/delete/:id', deleteBooking)


module.exports = route