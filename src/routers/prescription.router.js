const express = require('express')
const PrescriptionController = require('../controllers/prescription.controller.js');
const router = express.Router();

    // Create a new prescription
    router.post('/prescription/create', PrescriptionController.create);

    // Upload prescription image uploaded by the patient
    router.delete('/prescription/upload/:email', PrescriptionController.upload);

    module.exports = router;