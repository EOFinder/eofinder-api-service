const mongoose = require ('mongoose');

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  id_events: {
    type: Schema.Types.ObjectId,
    ref:'events',
    required: true
  },
  id_users: {
    type: Schema.Types.ObjectId,
    ref:'users',
    required: true
  },
  status: Boolean,
  default: true,
  required: false
}, { timestamps: true })

const Bookings = mongoose.model('bookings', bookingSchema)

module.exports = Bookings;