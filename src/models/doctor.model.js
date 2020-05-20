require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose')

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    doctorEmail: {
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
    specialization:{
        type: String,
        required: true,
       
    },
    contactNumber:
    {
        type:Number,
        required:false,
        trim:true
    },
    
})





const Doctor= mongoose.model('Doctor', doctorSchema)

module.exports = Doctor
