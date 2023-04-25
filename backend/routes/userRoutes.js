const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const { registerUser, loginUser, getProfile, getAllUsers, updateUser, deleteUser, getTotalUsers } = require("../controllers/userController");

router.get(`/`, getAllUsers);

router.get('/:id', protect, getProfile);

router.put('/:id', protect, updateUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.delete('/:id', deleteUser);

router.get(`/get/count`, getTotalUsers);


module.exports = router;

