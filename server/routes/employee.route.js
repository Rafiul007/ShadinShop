const express = require("express");
const router = express.Router();
const { login, createSuperadmin, addEmployee, deleteEmployee } = require('../controllers/employee.controller');
const {authenticate} = require('../middlewares/authMiddleware');

// Create superadmin
router.post('/create-superadmin', createSuperadmin);

// Login
router.post('/login', login);

// Add employee (only accessible by superadmin)
router.post('/add',authenticate, addEmployee);
router.get('/', (req,res)=>{
      res.send('Get employee');
})

// Delete employee (only accessible by superadmin)

module.exports = router;
