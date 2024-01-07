const asyncErrorHandler = require("../middelwares/errorHandlers/asyncErrorHandler");
const division = require("../models/division.model");

const getDivision = asyncErrorHandler(async (req, res, next) => {
  const { companyName, divisionName, areaName } = req.query;
  
  let query = {};
  if (companyName) {
    query.companyName = { $regex: companyName, $options: "i" };
  }
  if (divisionName) {
    query.divisionName = { $regex: divisionName, $options: "i" };
  }

  const result = await division.find(query);
  if (result.length) {
    if (areaName) {
      
      const areaInformation = result[0]?.areaInfo;
      const specificAreaInfo = areaInformation?.find((value) => {
        if (value.areaName === areaName) {
          return value;
        }
       
      });
      if(!specificAreaInfo) {
        const newError = new Error(`${areaName} area not found...`);
         newError.statusCode = 404;
         throw newError;
      }
     

      res
        .status(200)
        .json({
          sucess: true,
          msg: "Division area information found",
          data: [
            {
              companyName: result[0]?.companyName,
              divisionName: result[0]?.divisionName,
              areaInfo: [
                specificAreaInfo
              ],
            }
          ],
        });
    } else {
      console.log(result.areaInfo);
      res.status(200).json({sucess: true, msg: "Division information found", data: result});
    }
  }else{
   const resultError = new Error("No division information found..");
   resultError.statusCode = 404;
   throw resultError;
  }
});

const createDivision = asyncErrorHandler(async (req, res, next) => {
  const divisionInfo = req.body;
  console.log(divisionInfo);
  if (divisionInfo) {
    const response = await division.create(divisionInfo);
    res
      .status(200)
      .json({
        sucess: true,
        msg: "division created successfully..",
        data: response,
      });
  }
});





const updateDivision = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  const response = await division.findOneAndUpdate({ _id: id }, {
    $set: {
      divisionName: updatedData?.divisionName,
      companyName: updatedData?.companyName,
    },
    $push: { areaInfo: { $each: updatedData?.areaInfo } },
  }, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({
      sucess: true,
      msg: "division updated successfully",
      data: response,
    });
});

const deleteDivision = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await division.findOneAndDelete({ _id: id });
  if(response){
    res
    .status(200)
    .json({ sucess: true, msg: "division deleted successfully.. ", data: response});
  }else{
    res.status(404).json({sucess: false, msg: "division not found with id " + id })
  }
});

const getSingleDivision = asyncErrorHandler(async (req,res, next) => {
  const { id } = req.params;
  const response = await division.findById({ _id: id });
  if(response){
    res.status(200).json({ success: true, msg: "division found successfully", data: response});
  }else{
    res.status(404).json({success: false, msg: "division not found with id " +id})
  }

});

module.exports = {
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision
};

