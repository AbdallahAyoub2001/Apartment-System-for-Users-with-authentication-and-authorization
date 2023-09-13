const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads
const filesController = require('../fManagerController/fManagerController');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // You can customize storage options
const upload = multer({ storage });

// Define routes
router.post('/upload', upload.single('file'), filesController.uploadFile);
router.get('/:fileId', filesController.getFile);
router.delete('/:fileId', filesController.deleteFile);

module.exports = router;
