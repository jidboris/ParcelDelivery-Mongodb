const express = require("express");
const router = express.Router();
const userController = require('../controllers/user')

router.use(express.json());

router.post('/register', userController.create);
router.post('/login', userController.authenticate);


module.exports = router;