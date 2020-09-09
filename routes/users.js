const express = require('express')
const route = express.Router();

const {
    register,
    login,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
} = require('../controllers/users')

route.post('/user/regis', register)
route.post('/user/login', login)
route.get('/users', getAllUsers)
route.get('/user/:id', getOneUser)
route.put('/user/:id', updateUser)
route.delete('/user/:id', deleteUser)


module.exports = route;