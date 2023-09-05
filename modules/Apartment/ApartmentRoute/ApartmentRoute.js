// Routes page
const express = require('express');
const ApartmentController = require('../ApartmentController/ApartmentController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../ApartmentValidation/ApartmentValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');
const authorization = require("../../middlewares/authorization");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert User using post http://localhost:3000/users
router.post('/apartments', authService.authenticated, authorization.authorized(["A02"]), postValidation, validate, ApartmentController.addApartment);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/apartments', authService.authenticated, authorization.authorized(["A01"]), ApartmentController.getApartments);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/apartments/:apartment_id', authService.authenticated, authorization.authorized(["A01"]), getValidation, validate, ApartmentController.getApartment)

// Update user's info using his id http://localhost:3000/users/id
router.put('/apartments/:apartment_id', authService.authenticated, authorization.authorized(["A03"]), putValidation, validate, ApartmentController.updateApartment);

// delete a user using his ID
router.delete('/apartments/:apartment_id', authService.authenticated, authorization.authorized(["A04"]), deleteValidation, validate, ApartmentController.deleteApartment);

module.exports = router;