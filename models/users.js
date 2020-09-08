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
        type: Number,
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
    bookings: {
        type: Schema.Types.ObjectId,
        ref: 'bookings',
        required: true
    },
}, { timestamps: true })

const Users = mongoose.model('users', usersSchema)

module.exports = Users;