const asyncErrorHandler = require("../middelwares/errorHandlers/asyncErrorHandler");
const company = require('../models/company.model')

const getCompany = asyncErrorHandler(async (req, res, next) => {
   const response = await company.find({});
   res.status(200).json({success: true, message: "Company found..", data: response});
   
});

const createCompany = asyncErrorHandler(async (req, res, next) => {
   const {companyName} = req.body;
   if(companyName){
      const response = await company.create({companyName});
      res.status(200).json({sucess: true, msg: "Company created successfully..", data: response});
   }
   
});

const updateCompany = asyncErrorHandler(async (req, res, next) => {
   const {id} = req.params;
   const updatedData = req.body;
   const response = await company.findOneAndUpdate({_id: id}, updatedData, {new: true,runValidators: true });
   res.status(200).json({sucess: true, msg: "Company updated successfully", data: response});
});

const deleteCompany = asyncErrorHandler(async (req, res, next) => {
   const {id} = req.params;
   const response = await company.findOneAndDelete({_id: id});
   res.status(200).json({sucess: true, msg: "Company deleted successfully.. "})
});

module.exports = {
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};


