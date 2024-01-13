const postController = require('../controller/postController');
const router = require('express').Router();
router.post('/createPost', postController.createPost)
    .get('/getSubject', postController.getSubject)
    .get('/getTopicDetials', postController.getTopicDetials)
    .get('/getSerchResult', postController.getSearch)

module.exports = router;