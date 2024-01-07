const asyncErrorHandler = require("../middelwares/errorHandlers/asyncErrorHandler");
const medicine = require("../models/medicine.model");
const Fuse = require('fuse.js');

const getMedicine = asyncErrorHandler(async (req, res, next) => {
 const {search} = req.query;


if(search){


 
const response = await medicine.find({});
const fuse = new Fuse(response,{keys: ["brandName","genericName"]});
const data = fuse.search(search);


  

if(data.length){
 res.status(200).send({success: true, msg: "Medicine found..", data: data, nHits: data.length})
}else{
 res.status(404).send({success: false, msg: "No match found"});
}
}else{
  const response = await medicine.find({}).sort({brandName: 'asc'});
  res.status(200).send({success: true, msg: "All medicine found", data: response, nHits: response.length});
}



});

const createMedicine = asyncErrorHandler(async (req, res, next) => {
  const medicineData = req.body;
  const response = await medicine.create(medicineData);
  if (response){
    res.status(200).json({success: true, msg: 'Medicine created successfully..', data: response});
  }
});

const updateMedicine = asyncErrorHandler(async (req, res, next) => {
  const {id} = req.params;
  const updatedData = req.body;
  const response = await medicine.findOneAndUpdate({_id: id}, updatedData, {new: true, runValidators: true});
  res.status(200).send({success: true, msg: "Medicine updated successfully..", data: response});
});

const deleteMedicine = asyncErrorHandler(async (req, res, next) => {
 const {id} = req.params;
 const response = await medicine.findOneAndDelete({_id: id});
 res.status(200).json({succes: true, msg: "Medicine deleted successfully..", data: response})
});

module.exports = {
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
