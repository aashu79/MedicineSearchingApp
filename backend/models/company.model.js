const mongoose = require('mongoose');

const uniqueValidators = async (value)=>{
    const isExisting = await Company.findOne({companyName: value});
    if(isExisting){
        return false;
    }else{
        return true;
    }

}

const companySchema = mongoose.Schema({
 
    companyName: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        minlength: [1, 'Company name cannot be less than 1.....'],
        maxlength: [255, "Company name Cannot be more than 255 characters"],
        validate: {
            validator: uniqueValidators,
            message: "Company is already registered.."
        }
    
    }
}, {timestamps: true});
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
