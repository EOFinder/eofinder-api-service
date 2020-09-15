const mongoose = require('mongoose')
require('dotenv').config()

const database = 'eventfinder';
const url= `${process.env.DB}${database}`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;


module.exports = db;