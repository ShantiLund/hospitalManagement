const express = require('express')
const ApponitmentController = require('../controllers/appointment.controller.js');
const router = express.Router();

    // Create a new appointment
    router.post('/appointment/create', ApponitmentController.create);

    // Retrieve all appointments
    router.get('/appointments', ApponitmentController.findAll);

    // Retrieve a single appointment with appont_id
    router.get('/appointment/:appoint_id', ApponitmentController.findOne);

    // Update a appointment with appont_id
    router.put('/appointment/:appoint_id', ApponitmentController.update);

    // Delete a appointment with appont_id
    router.delete('/appointment/:appoint_id', ApponitmentController.delete);

    module.exports = router;