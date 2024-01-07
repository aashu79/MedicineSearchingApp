const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required.."],
      
    },
    email:{
        type: String,
        required: [true, 'Email is required field...'],
        validate: {
            validator: isEmail,
            message: 'Please enter a valid email'
        }

    },
    password: {
        type: String,
        required: [true, 'Password is required field...'],
        minlength: [8, "Password must be at least 8 characters.."],

    },
    isVerified: {
        type: Boolean,
        required: [true, 'Is this a verified'],
        default: false,
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt );
    next();
})

module.exports = mongoose.model('User', userSchema);