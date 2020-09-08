const mongoose = require('mongoose')

const database = 'eventfinder';
const url= `mongodb+srv://eventfinder:eventfinder@eventfinder.jktgh.mongodb.net/${database}`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;


module.exports = db;