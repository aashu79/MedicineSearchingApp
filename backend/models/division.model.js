const mongoose = require('mongoose');
const company = require('./company.model')



function lengValidator(value){
 if( value.length === 10){
  return true
 }else{
  return false
 }
  
}
async function validateCompanyName(value){
  try{
    const comp = await company.findOne({companyName: value});
    if(comp){
      return true;
    }else{
      return false;
    }

  }catch(err){
    throw new Error(err.message);
  }
} 

const divisionSchema =  mongoose.Schema({
  divisionName: {
    type: String,
    required: [true, "Dvision name is required.."],
    lowercase: true,
    maxlength: [255, "Dvision name cannot exceed 255 characters"]
  },
  companyName: {
    type: String,
    required: [true, "Dvision name is required.."],
    uppercase: true,
    validate: {
      validator: validateCompanyName,
      message: "Company name is Invalid"
    }
  },
  areaInfo: [
    {
      areaName: {
        type: String,
        

      },
      areaContact: {
        type: String,
      
        validate: {
          validator: lengValidator,
          message: "Please enter a valid contact number"
        }
      }
    }
  ]
})


module.exports = mongoose.model('Division', divisionSchema)