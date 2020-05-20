const express = require('express');
const router = express.Router()
const userRouter = require('./routers/user.router');
const adminRouter = require('./routers/admin.router');
const appointmentRouter = require('./routers/appointment.router');
const doctorRouter=require('./routers/doctor.router');
const patientRouter=require('./routers/patient.router');
const prescriptionRouter = require('./routers/prescription.router');
//var cors = require('cors');
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
require('./db/db');

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(userRouter);
app.use(adminRouter);
app.use(appointmentRouter);
app.use(doctorRouter);
app.use(prescriptionRouter);
app.use(patientRouter);

// require('./src/routers/course.router.js')(app);
const port = process.env.PORT || 3000;
console.log("port address is"+process.env.PORT)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})