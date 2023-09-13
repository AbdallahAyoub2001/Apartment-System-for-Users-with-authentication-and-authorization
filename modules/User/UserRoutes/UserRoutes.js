// Routes page
const express = require('express');
const userController = require('../UserController/UserController');
const { postValidation, putValidation, getValidation,
    deleteValidation, signupValidation, loginValidation,
    addUserToGroupValidation, getGroupUsersValidation,
    deleteUserFromGroupValidation, addUserFilesValidation,
    deleteUserFilesValidation, validate } = require('../UserValidation/UserValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');
const authorization = require('../../middlewares/authorization');

const router = express.Router();



//The main page of the server
router.get('/', (req, res) => {
    res.send("Welcome to users' server!");
})

// Insert User using post http://localhost:3000/users
router.post('/users', authService.authenticated, authorization.authorized(["U02"]), postValidation, validate, userController.addUser);

// Add User to a group -> AD01 => Admin Operations
router.post('/users/:user_id/groups/:group_id', authService.authenticated, authorization.authorized(["AD01"]), addUserToGroupValidation, validate, userController.assignUserToGroup);

// Add a file for a user
router.post('/users/:user_id/files', authService.authenticated, authorization.authorized(["U02"]), addUserFilesValidation, validate, userController.assignFilesToUser);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/users', authService.authenticated, authorization.authorized(["U01"]), userController.getUsers);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/users/:user_id', authService.authenticated, authorization.authorized(["U01"]), getValidation, validate, userController.getUser);

// API to get a group users
router.get('/users/groups/:group_id', authService.authenticated, authorization.authorized(["AD01"]), getGroupUsersValidation, validate, userController.getUsersOfGroup);

// Update user's info using his id http://localhost:3000/users/id
router.put('/users/:user_id', authService.authenticated, authorization.authorized(["U03"]), putValidation, validate, userController.updateUser);

// delete a user using his ID
router.delete('/users/:user_id', authService.authenticated, authorization.authorized(["U04"]), deleteValidation, validate, userController.deleteUser);

// delete a user from a group
router.delete('/users/:user_id/groups/:group_id', authService.authenticated, authorization.authorized(["AD01"]), deleteUserFromGroupValidation, validate, userController.deleteUserFromGroup);

// Delete a file for a user
router.delete('/users/:user_id/files/:file_id', authService.authenticated, authorization.authorized(["U04"]), deleteUserFilesValidation, validate, userController.deleteFileOfUser);

// sign-up a new user
router.post('/signup', signupValidation, validate, userController.signup);
router.post('/login', loginValidation, validate, userController.login);

module.exports = router;