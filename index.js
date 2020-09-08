const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 4444;

const eventRouter = require('./routes/events')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('welcome to api Event Finder')
})

app.use('/', eventRouter)

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`Currently Connected to ${db._connectionString}`));


app.listen(port, () => {
    console.log(`Currently Connected on http://localhost:${port}`)
})