require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose')

const validator = require('validator')
const AppontmentSchema = mongoose.Schema({
    appoint_id: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
       
        
    },
   
    DocName:
    {
        type:String,
        required:false,
        trim:true

    },
    date: {
        type: String,
        required: true
    },
    time:
    {
        type:String,
        required:true,
        trim:true

    }

    });

    const Appointment = mongoose.model('Appointment', AppontmentSchema)

    module.exports = Appointment
