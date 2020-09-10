const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default: "ADMIN"
    },
    image: {
        type: String,
        required: false
    }
}, {timestamps: true})

const Admins = mongoose.model('admins', adminSchema)

module.exports = Admins;