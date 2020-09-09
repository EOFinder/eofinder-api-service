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

route.post('/users/register', register)
route.post('/users/login', login)
route.get('/users', getAllUsers)
route.get('/users/:id', getOneUser)
route.put('/users/:id', updateUser)
route.delete('/users/:id', deleteUser)


module.exports = route;