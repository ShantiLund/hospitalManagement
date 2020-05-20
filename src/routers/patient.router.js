const express = require('express')
const PatientController = require('../controllers/patient.controller.js');
const router = express.Router();

   

    // view all patients
    router.get('/patients',PatientController.findAll);

   

    module.exports = router;