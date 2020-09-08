const mongoose = require('mongoose');

const Schema = mongoose.Schema

const eventSchema = new Schema({
    posted_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isDone: {
       type: Boolean,
       required: false,
       default: false
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'bookings'
    }]
   
}, { timestamps: true })

const Events = mongoose.model('events', eventSchema)

module.exports = Events;