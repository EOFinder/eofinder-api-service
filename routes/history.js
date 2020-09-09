const route = require('express').Router();


const{
 getAllHistory,
 getHistoryByUser
} = require('../controllers/history')

route.get('/history', getAllHistory)
route.get('/history/:id', getHistoryByUser)



module.exports = route