const UserController = require('../controller/userController');
const router = require('express').Router();
router.post('/register', UserController.Register)
    .post('/login', UserController.Login)

module.exports = router;


