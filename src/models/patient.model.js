require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose')

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    patientEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
   
    contactNumber:
    {
        type:Number,
        required:false,
        trim:true
    },
    
})




const Patient= mongoose.model('Patient', patientSchema)

module.exports = Patient
