const mongoose = require('mongoose');
const company = require('./company.model');






const companyNameValidator = async(value)=>{
    const existingCompany = await company.findOne({companyName: value});
    if(existingCompany){
        return true
    }else{
        return false;
    }
}


const medicineSchema = mongoose.Schema({
    brandName: {
        type: String,
        required: [true, "Brand name is required.."],
        maxlength: [255, "Brand name cannot exceed 255 characters.."],
       
    },
    genericName: {
        type: String,

        required: [true, "Generic name is required"],
        maxlength: [255, "Generic name cannot exceed 255 characters"],
        
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
        maxlength: [255, "Company name cannot exceed 255 characters"],
        uppercase: true,
        validate: {
            validator: companyNameValidator,
            message: "Please a valid company name..."
        }
    },
    divisionName: {
        type: String,
        required: [true, "Division name is required"],
        maxlength: [255, "Division name cannot exceed 255 characters"],
        lowercase: true, 
       
    },
    strength: {
        type: [String],
        required: [true, "Strength is required"],
    }
})





const Medicine = mongoose.model('Medicine',medicineSchema);
module.exports = Medicine;