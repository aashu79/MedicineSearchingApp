import { useEffect, useState } from "react";
import CompanySvc from "../../../controller/company.controller";
import MedicineSvc from "../../../controller/medicine.controller";
import "./style.css";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MedicineEditingPage = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandName = searchParams.get('brandName');
  const genericName = searchParams.get('genericName');
  const companyName = searchParams.get('companyName');
  const divisionName = searchParams.get('divisionName');
  const strength = searchParams.get('strength');
  

  const getAllCommpanies = async () => {
    try {
      const response = await CompanySvc.getAllCompany();
      
      setCompany(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCommpanies();
  }, []);


  const medicineShema = Yup.object({
    brandName: Yup.string().required(),
    genericName: Yup.string().required(),
    companyName: Yup.string().required(),
    divisionName: Yup.string().required(),
    strength: Yup.string().required()


  });

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(medicineShema)
  })

  const medicineHandler = async(data) => {
    try{
      
      const newData = {...data};
      const strength = newData.strength;
      const strengthArray = strength.split(',');
      newData.strength = strengthArray;
      const token = localStorage.getItem('AccessToken');
      if(token){
        const response = await MedicineSvc.updateMedicine(token, id, newData);
        navigate('/admin/medicine')
        toast.success(response?.data?.msg);
      
      }
      
    }catch (error) {
      if(error?.response?.data?.error){
        error?.response?.data?.error?.map((data)=>{
          toast.error(data?.msg);
        })
      }
      console.log(error?.response?.data)
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="form-container">
          <div className="logo-container">Edit Medicine</div>

          <form className="form" onSubmit={handleSubmit(medicineHandler)}>
            <div className="form-group">
              <label htmlFor="brandName">Brand Name</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                placeholder="Enter Brand Name"
                defaultValue={brandName}
                {...register("brandName")}
              />
              {errors && (
                <p style={{ color: "red" }}>{errors?.brandName?.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="genericName">Generic Name</label>
              <input
                type="text"
                id="genericName"
                name="genericName"
                placeholder="Enter generic Name"
                defaultValue={genericName}
                {...register("genericName")}
              />
              {errors && (
                <p style={{ color: "red" }}>{errors?.genericName?.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
            
              <select name="companyName" id="companyName" defaultValue={companyName} {...register('companyName')} >
                <option value="">Select a Company Name</option>
               {
                company?.map((value)=>{
                  return(
                    <option key={value._id} value={value.companyName}>{value.companyName}</option>
                  )
                })
               }
              </select>

              {errors && (
                <p style={{ color: "red" }}>{errors?.companyName?.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="divisionName">Division Name</label>
              <input
                type="text"
                id="divisionName"
                defaultValue={divisionName}
                name="divisionName"
                placeholder="Enter Division Name"
                {...register("divisionName")}
              />
              {errors && (
                <p style={{ color: "red" }}>{errors?.divisionName?.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="strength">Strength</label>
              <input
                type="text"
                id="strength"
                name="strength"
                defaultValue={strength}
                placeholder="Enter Strength seperated by commas"
                {...register("strength")}
              />
              {errors && (
                <p style={{ color: "red" }}>{errors?.strength?.message}</p>
              )}
            </div>

            <button className="form-submit-btn" type="submit" disabled={loading}>
              Edit Medicine
            </button>
          </form>
        </div>
      </Box>
    </>
  );
};

export default MedicineEditingPage;
