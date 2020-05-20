const Doctor = require('../models/doctor.model.js');
// retrieve all doctors from the database
exports.findAll = (req, res) => {
    Doctor.find()
    .then(doctor => {
        res.send(doctor);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving doctors."
        });
    });
};