const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 4444;




// Router
const usersRouter = require('./routes/users')
const bookingRouter = require('./routes/booking');
const eventRouter = require('./routes/events')
const historyRouter = require('./routes/history')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('welcome to api Event Finder')
})
app.use('/api', usersRouter)
app.use('/api', bookingRouter)
app.use('/api', eventRouter)
app.use('/api', historyRouter)

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`Currently Connected to ${db._connectionString}`));


app.listen(port, () => {
    console.log(`Currently Connected on http://localhost:${port}`)
})