// Routes page
const express = require('express');
const NeighborhoodController = require('../NeighborhoodController/NeighborhoodController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../NeighborhoodValidation/NeighborhoodValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');
const authorization = require("../../middlewares/authorization");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert User using post http://localhost:3000/users
router.post('/neighborhoods', authService.authenticated, authorization.authorized(["N02"]), postValidation, validate, NeighborhoodController.addNeighborhood);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/neighborhoods', authService.authenticated, authorization.authorized(["N01"]), NeighborhoodController.getNeighborhoods);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/neighborhoods/:neighborhood_id', authService.authenticated, authorization.authorized(["N01"]), getValidation, validate, NeighborhoodController.getNeighborhood)

// Update user's info using his id http://localhost:3000/users/id
router.put('/neighborhoods/:neighborhood_id', authService.authenticated, authorization.authorized(["N03"]), putValidation, validate, NeighborhoodController.updateNeighborhood);

// delete a user using his ID
router.delete('/neighborhoods/:neighborhood_id', authService.authenticated, authorization.authorized(["N04"]), deleteValidation, validate, NeighborhoodController.deleteNeighborhood);

module.exports = router;