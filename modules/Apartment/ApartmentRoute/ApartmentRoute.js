// Routes page
const express = require('express');
const ApartmentController = require('../ApartmentController/ApartmentController');
const { postValidation, putValidation,
    getValidation, deleteValidation, getApartmentFilesValidation,
    addApartmentFilesValidation, deleteApartmentFilesValidation, validate } = require('../ApartmentValidation/ApartmentValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');
const authorization = require("../../middlewares/authorization");
const fManager = require("../../fileManager/fManagerModel/fManagerModel");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert Apartment using post http://localhost:3000/apartments
router.post('/apartments', authService.authenticated, authorization.authorized(["A02"]), postValidation, validate, ApartmentController.addApartment);

// Add a file for an apartment
router.post('/apartments/:apartment_id/files', authService.authenticated, authorization.authorized(["A02"]), addApartmentFilesValidation, validate, fManager.upload.array('file'), ApartmentController.assignFilesToApartment);

// Select all apartments
// select a specific apartment using key and value http://localhost:3000/apartments/?key=name&value=Abood
router.get('/apartments', authService.authenticated, authorization.authorized(["A01"]), ApartmentController.getApartments);

//Get apartment using one of his attributes http://localhost:3000/apartments/key/value
router.get('/apartments/:apartment_id', authService.authenticated, authorization.authorized(["A01"]), getValidation, validate, ApartmentController.getApartment)

// API to get an apartment files
router.get('/apartments/:apartment_id/files', authService.authenticated, authorization.authorized(["A01"]), getApartmentFilesValidation, validate, ApartmentController.getApartmentFiles);

// Update apartment's info using his id http://localhost:3000/apartments/id
router.put('/apartments/:apartment_id', authService.authenticated, authorization.authorized(["A03"]), putValidation, validate, ApartmentController.updateApartment);

// delete an apartment using his ID
router.delete('/apartments/:apartment_id', authService.authenticated, authorization.authorized(["A04"]), deleteValidation, validate, ApartmentController.deleteApartment);

// Delete a file for an apartment
router.delete('/apartments/:apartment_id/files/:file_id', authService.authenticated, authorization.authorized(["A04"]), deleteApartmentFilesValidation, validate, ApartmentController.deleteFileOfApartment);

module.exports = router;