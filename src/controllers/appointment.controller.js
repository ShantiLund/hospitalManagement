const Appointment = require('../models/appointment.model.js');

// Create and Save a new Appointment
exports.create = (req, res) => {
   

    // Create a Appointment
    const appointment = new Appointment({
        appoint_id: req.body.appoint_id , 
        email: req.body.email,
        DocName:req.body.DocName,
        date: req.body.date,
        time: req.body.time


    });

    // Save Appointment in the database
    appointment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Course."
        });
    });
};

// Retrieve and return all appointments from the database.
exports.findAll = (req, res) => {
    Appointment.find()
    .then(appointment => {
        res.send(appointment);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

// Find a single Appointment with a appoint_id
exports.findOne = (req, res) => {
    Appointment.findById(req.params.appoint_id)
    .then( appointment=> {
        if(!appointment) {
            return res.status(404).send({
                message: "Appointment not found with id " + req.params.appoint_id
            });            
        }
        res.send(appointment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.appoint_id
            });
        }
        return res.status(500).send({
            message: "Error retrieving course with id " + req.params.appoint_id
        });
    });
};

// Update a course identified by the AppointmentId in the request
exports.update = (req, res) => {
    // Find Appointment and update it with the request body
    Appointment.findByIdAndUpdate(req.params.appoint_id, {
       
        email: req.body.email,
        date: req.body.date,
        time: req.body.time 
    }, {new: true})
    .then(appointment => {
        if(!appointment) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.appoint_id
            });
        }
        res.send(appointment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.appoint_id
            });                
        }
        return res.status(500).send({
            message: "Error updating course with id " + req.params.appoint_id
        });
    });
};

// Delete a Appointment with the specified courseId in the request
exports.delete = (req, res) => {
    Appointment.findByIdAndRemove(req.params.appoint_id)
    .then(appointment => {
        if(!appointment) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.appoint_id
            });
        }
        res.send({message: "Appointment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Appointment not found with id " + req.params.appoint_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Appointment with id " + req.params.appoint_id
        });
    });
};

