const route = require('express').Router();


const{
  addAdmin,
  getAllAdmin,
  getOneAdmin,
  updateAdmin,
  pendingApproval
} = require('../controllers/admin')


route.post('/create/:roles', addAdmin)
route.get('/', getAllAdmin)
route.get('/:id', getOneAdmin)
route.put('/:id', updateAdmin)
route.put('/approval/:id', pendingApproval)


module.exports = route