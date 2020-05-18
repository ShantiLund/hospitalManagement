require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose')

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
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
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    role:
    {
        type:String,
        required:true,
        lowercase:true,
        trim:true

    },
    contactNumber:
    {
        type:Number,
        required:false,
        trim:true
    },
    varified:
    {
        type:Boolean,
        required:false,
        trim: true
    },
    newPassword:
    {

        type:String,
        required:false,
        trim:true


    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    console.log("here");
    if (user.isModified('password')) {
        console.log("user password is "+user.password);
        user.password = await bcrypt.hash(user.password, 8)
        console.log("After encryption"+user.password);
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    console.log("Here to generate token");
    const user = this
    console.log("user id is "+user._id)
    console.log("web token is "+process.env.JWT_KEY)
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    console.log(password);
    const user = await User.findOne({email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch =  bcrypt.compare(password, user.password)
    console.log(user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
