const mongoose = require('mongoose');

const Schema = mongoose.Schema

const usersSchema = new Schema({
    providerId: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: "user"
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'bookings',
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'events',
    }]
}, { timestamps: true })

const Users = mongoose.model('users', usersSchema)

module.exports = Users;