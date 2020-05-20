require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose')
const PrescriptionSchema = mongoose.Schema({
    prescription_id: {
        type: String,
        required: false,
        trim: true
    },
    email: {
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
    pres_expiry_Date:{
        type:Date,
        required:false,
        trim:true

    },
   link:{
        type:String,
        required:true,
        trim:true
    }
    

    });

    const Prescription = mongoose.model('Prescription', PrescriptionSchema)

    module.exports = Prescription
