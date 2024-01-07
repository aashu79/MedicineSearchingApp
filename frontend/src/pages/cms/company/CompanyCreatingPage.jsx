import React from "react";
import "./style.css";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CompanySvc from "../../../controller/company.controller";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompanyCreatingPage = () => {
  const navigate = useNavigate();
  const companySchema = Yup.object({
    companyName: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });

  const companyHandler = async (data) => {
    try {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        const response = await CompanySvc.createCompany(token, data);
        navigate("/admin/company");
        toast.success(response?.data?.msg);
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.error) {
        error.response.data.error?.map((data) => {
          toast.error(data.msg);
        });
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="form-container">
        <div className="logo-container">Create A New Company</div>

        <form className="form" onSubmit={handleSubmit(companyHandler)}>
          <div className="form-group">
            <label for="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Company Name"
              {...register("companyName")}
            />
            {errors && (
              <p style={{ color: "red" }}>{errors?.companyName?.message}</p>
            )}
          </div>

          <button className="form-submit-btn" type="submit">
            Create Company
          </button>
        </form>
      </div>
    </Box>
  );
};

export default CompanyCreatingPage;
