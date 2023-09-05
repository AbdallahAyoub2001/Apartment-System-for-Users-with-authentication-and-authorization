// Routes page
const express = require('express');
const PermissionController = require('../PermissionController/PermissionController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../PermissionValidation/PermissionValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');
const authorization = require("../../middlewares/authorization");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert User using post http://localhost:3000/users
router.post('/permissions', authService.authenticated, authorization.authorized(["AD01"]), postValidation, validate, PermissionController.addPermission);

// Select all permissions
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/permissions', authService.authenticated, authorization.authorized(["AD01"]), PermissionController.getPermissions);

//Get permission using one of his attributes http://localhost:3000/users/key/value
router.get('/permissions/:code_id', authService.authenticated, authorization.authorized(["AD01"]), getValidation, validate, PermissionController.getPermission)

// Update permission's info using his id http://localhost:3000/users/id
router.put('/permissions/:code_id', authService.authenticated, authorization.authorized(["AD01"]), putValidation, validate, PermissionController.updatePermission);

// delete a permission using his ID
router.delete('/permissions/:code_id', authService.authenticated, authorization.authorized(["AD01"]), deleteValidation, validate, PermissionController.deletePermission);



module.exports = router;