const express = require("express");
const router = express.Router();
const { login, createSuperadmin, addEmployee, deleteEmployee } = require('../controllers/employee.controller');
const { authenticate } = require('../middlewares/authMiddleware');
const {isSuperadmin} = require('../middlewares/isSuperAdmin');

// Create superadmin
router.post('/create-superadmin', createSuperadmin);

// Login
router.post('/login', login);

// Add employee (only accessible by superadmin)
router.post('/add', authenticate, isSuperadmin, addEmployee);

// Delete employee (only accessible by superadmin)
router.delete('/:id', authenticate, isSuperadmin, deleteEmployee);

module.exports = router;
