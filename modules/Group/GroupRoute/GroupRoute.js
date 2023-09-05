// Routes page
const express = require('express');
const GroupController = require('../GroupController/GroupController');
const { postValidation, putValidation, getValidation, deleteValidation,
    permissionAssignmentValidation, getGroupPermissionValidation, getGroupPermissionsValidation,
    updateGroupPermissionValidation, deleteGroupPermissionsValidation, deleteGroupPermissionValidation, validate } = require('../GroupValidation/GroupValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');
const authorization = require("../../middlewares/authorization");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert User using post http://localhost:3000/users
router.post('/groups', authService.authenticated, authorization.authorized(["G02"]), postValidation, validate, GroupController.addGroup);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/groups', authService.authenticated, authorization.authorized(["G01"]), GroupController.getGroups);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/groups/:group_id', authService.authenticated, authorization.authorized(["G01"]), getValidation, validate, GroupController.getGroup)

// Update user's info using his id http://localhost:3000/users/id
router.put('/groups/:group_id', authService.authenticated, authorization.authorized(["G03"]), putValidation, validate, GroupController.updateGroup);

// delete a user using his ID
router.delete('/groups/:group_id', authService.authenticated, authorization.authorized(["G04"]), deleteValidation, validate, GroupController.deleteGroup);

// API to assign a permission to a group
router.post('/groups/:group_id/permissions/:code_id', authService.authenticated, authorization.authorized(["AD01"]), permissionAssignmentValidation, validate, GroupController.assignPermissionToGroup);

router.put('/groups/:group_id/permissions/:group_code_id', authService.authenticated, authorization.authorized(["AD01"]), updateGroupPermissionValidation, validate, GroupController.updatePermissionOfGroup);

// API to get a permission of a group
router.get('/groups/:group_id/permissions/:group_code_id', authService.authenticated, authorization.authorized(["AD01"]), getGroupPermissionValidation, validate, GroupController.getPermissionOfGroup);

// API to get the permissions of a group
router.get('/groups/:group_id/permissions', authService.authenticated, authorization.authorized(["AD01"]), getGroupPermissionsValidation, validate, GroupController.getPermissionsOfGroup);

// API to delete a permission of a group
router.delete('/groups/:group_id/permissions/:group_code_id', authService.authenticated, authorization.authorized(["AD01"]), deleteGroupPermissionValidation, validate, GroupController.deletePermissionOfGroup);

// API to delete the permissions of a group
router.delete('/groups/:group_id/permissions', authService.authenticated, authorization.authorized(["AD01"]), deleteGroupPermissionsValidation, validate, GroupController.deletePermissionsOfGroup);

module.exports = router;