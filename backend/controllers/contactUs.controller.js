const asyncErrorHandler = require("../middelwares/errorHandlers/asyncErrorHandler");
const contactUs = require('../models/contactUs.model');


const getAllContactUs = asyncErrorHandler(async(req, res, next)=>{
    const response = await contactUs.find({});
    if(response){
        res.status(200).json({success: true, message: "contactUs found..", data: response});
    }else{
        res.status(404).json({success: false, message: "non contactUs found", data: null});
    }
})

const createContactUs = asyncErrorHandler(async(req, res, next)=>{
    const {name, email,number, message} = req.body;
    const response = await contactUs.create({name, email, number, message});
    if(response){
        res.status(200).json({success: true, message:"contactUs created..", data: response});

    }else{
        res.status(404).json({success: false, message: "contact us not created..", data: null});
    }
});


const deleteContactUs = asyncErrorHandler(async(req, res, next)=>{
    const {id} = req.params;
    const response = await contactUs.findOneAndDelete({_id: id});
    if(response){
        res.status(200).json({sucess: "true", msg: "Contact us Message delted successfully "})
    }else{
        res.status(404).json({success:false, msg: "Couldn't delete contact us message. try again later"})
    }
});

module.exports = {getAllContactUs, createContactUs, deleteContactUs}