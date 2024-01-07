 const mongoose = require('mongoose');
const { isEmail } = require('validator');


function lengValidator(value){
    if( value.length === 10){
     return true
    }else{
     return false
    }
     
   }

 const contactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        validate:{
            validator: isEmail,
            message: 'Please enter a valid email address'
        }
    },
    number: {
        type: String,
        requirer: true,
        vaidate: {
            validator: lengValidator,
            message: 'Please enter a valid number'
        }

    },
    message: {
        type: String,
        required: true,
        max: [225, "message can't exceed 255 characters."]
    }
 })

module.exports = mongoose.model('ContactUs', contactUsSchema);