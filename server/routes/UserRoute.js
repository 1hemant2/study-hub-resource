const UserController = require('../controller/userController');
const authmiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();
router.post('/register', UserController.Register)
    .post('/login', UserController.Login)
    .get('/user', authmiddleware, UserController.currentUser);

module.exports = router;


