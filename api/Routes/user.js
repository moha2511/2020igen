const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require("../middleware/check-auth").default;


//Tested
router.post("/login", UserController.userLogin);

//Tested
router.put("/change",checkAuth, UserController.changePassword);

router.post("/declinedMail",checkAuth,UserController.sendDeclineMail);

router.post("/publishedMail",checkAuth,UserController.sendPublishedMail);

//Tested
router.post("/signup",checkAuth, UserController.createUser);

//Tested
router.get('',checkAuth, UserController.getAllUsers);

//Tested
router.delete('/:id',checkAuth,UserController.deleteUser);

//Tested
router.put('/resetPassword',checkAuth,UserController.resetPassword);

module.exports = router;
