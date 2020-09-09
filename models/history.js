const mongoose = require ('mongoose');

const Schema = mongoose.Schema

const historySchema = new Schema({
  id_events: {
    type: Schema.Types.ObjectId,
    ref: 'events',
    required: true
  },
  id_users: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  id_bookings: {
      type: Schema.Types.ObjectId,
      ref: 'bookings'
  },
}, { timestamps: true })

const History = mongoose.model('history', historySchema)

module.exports = History;