const Patient = require('../models/patient.model.js');
// retrieve all patients from the database
exports.findAll = (req, res) => {
    Patient.find()
    .then(patient=> {
        res.send(patient);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving doctors."
        });
    });
};