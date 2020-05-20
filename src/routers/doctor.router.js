const express = require('express')
const DoctorController = require('../controllers/doctor.controller.js');
const router = express.Router();

   

    // view all doctors
    router.get('/doctors', DoctorController.findAll);

   

    module.exports = router;