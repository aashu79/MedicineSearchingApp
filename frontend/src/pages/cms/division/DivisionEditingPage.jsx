import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import CompanySvc from "../../../controller/company.controller";

import "./style.css";
import DivisionSvc from "../../../controller/division.controller";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DivisionEditingPage = () => {

  const navigate = useNavigate()
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState();
  const divisionSchema = Yup.object({
    divisionName: Yup.string().required(),
    companyName: Yup.string().required(),
    areaInfo: Yup.array().of(
      Yup.object().shape({
        areaName: Yup.string().required(),
        areaContact: Yup.string().required(),
      })
    ),
  });
  // ---------------------query-----------------------
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const divisionName = searchParams.get('divisionName');
  const companyName = searchParams.get('companyName');
  const {id} = useParams();
  // _____________________________

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(divisionSchema),
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "areaInfo",
  });
  

  const getAllCommpanies = async () => {
    try {
      const response = await CompanySvc.getAllCompany();
      // console.log(response.data.data);
      setCompany(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCommpanies();
  }, []);

  const divisionHandler = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("AccessToken");
      if (token) {
        const response = await DivisionSvc.updateDivision(token, id, data);
        navigate(`/admin/division/${id}`);
        toast.success(response?.data?.data.msg);
        // console.log(response);
      }
    } catch (error) {
      if(error?.response?.data?.error){
        error?.response?.data?.error?.map((data)=>{
          toast.error(data?.msg);
        })}
    }finally{
      setLoading(false)
    }
  };

  // -------------------------Basic Form----------------------------------------
  const basicForm = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="form-container">
        <div className="logo-container">Update Division</div>

        <div className="form-group">
          <label htmlFor="divisionName">Division Name</label>
          <input
            type="text"
            id="divisionName"
            name="divisionName"
            placeholder="Enter Division Name"
            defaultValue={divisionName}
            {...register("divisionName")}
          />
          {errors && (
            <p style={{ color: "red" }}>{errors?.divisionName?.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>

          <select
            name="companyName"
            id="companyName"
            defaultValue={companyName}
            {...register("companyName")}
          >
            <option value="">Select a Company Name</option>
            {company?.map((value) => {
              return (
                <option key={value._id} value={value.companyName}>
                  {value.companyName}
                </option>
              );
            })}
          </select>

          {errors && (
            <p style={{ color: "red" }}>{errors?.companyName?.message}</p>
          )}
        </div>
      </div>
    </Box>
  );
  // --------------------------------------------------------------------------------
  return (
    <>
      <Box sx={{margin: "50px auto 50px auto"}}>
        <form className="form" onSubmit={handleSubmit(divisionHandler)}>
          <div>{basicForm}</div>
          <div className="form-container">
            <div className="logo-container">Area Information</div>
            {fields.map((field, index) => {
              return(
                <div key={field.id} style={{border: '1px solid smokeyWhite'}}>
                <div className="form-group">
                  <label htmlFor="areaName">Area Name</label>
                  <input
                    type="text"
                    id="areaName"
                    name={`areaInfo[${index}].areaName`}
                    placeholder="Enter Area Name"

                    {...register(`areaInfo[${index}].areaName`)}
                    defaultValue={field.areaName}
                  />
                  {errors && (
                    <p style={{ color: "red" }}>
                      {errors[`areaInfo[${index}].areaName`]?.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="areaContact">Area contact</label>
                  <input
                    type="text"
                    id="areaContact"
                    name={`areaInfo[${index}].areaContact`}
                    placeholder="Enter Area Contact Num"
                    {...register(`areaInfo[${index}].areaContact`)}
                    defaultValue={field.areaContact}
                  />
                  {errors && (
                    <p style={{ color: "red" }}>
                      {errors[`areaInfo[${index}].areaContact`]?.message}
                    </p>
                  )}
                </div>
                <Button variant="contained" sx={{backgroundColor: "red"}} onClick={()=>{remove(index)}}>Delete</Button>
              </div>
              )
            })}

            <Button variant="contained" sx={{backgroundColor: "green"}} onClick={()=>{append({areaName: "", areaContact: ""})}}>Add Area Info</Button>
          </div>

          <button className="form-submit-btn" type="submit" disabled={loading}>
            Update Division
          </button>
        </form>
      </Box>
    </>
  );
};

export default DivisionEditingPage;
