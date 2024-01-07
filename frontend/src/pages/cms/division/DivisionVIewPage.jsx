import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader/Loader"
import DivisionSvc from "../../../controller/division.controller";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DivisionVIewPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const { id } = useParams();
  const getDivisionInfo = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("AccessToken");
      if (token) {
        const response = await DivisionSvc.getSingleDivision(token, id);
        // console.log(response?.data?.data);
        setInfo(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDivisionInfo(id);
  }, []);


  // ----------------------------delte operation____________________________________
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const token = localStorage.getItem("AccessToken");
          // console.log(token);

          if (token) {
            const response = await DivisionSvc.deleteDivision(token, id);

            navigate("/admin/division")
            toast.success(response?.data?.data?.msg);

            Swal.fire({
              title: "Deleted!",
              text: "Division deleted successfully.....",
              icon: "success",
            });
          }
        } catch (error) {
          toast.error(error.response.data.msg);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
  };
// _______________________________________________________________________________________

  return (
    <Box>
      {loading ? (
        <Box>
          <Loader />
        </Box>
      ) : !info ? (
        <Box>No information</Box>
      ) : (
        <>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "5px",
              margin: "20px auto 20px auto",
              width: "60%",
              padding: "20px",
              WebkitBoxShadow:
                "10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
              boxShadow:
                "-10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
            }}
          >
            <Typography variant="h6" sx={{margin: "30px"}}>Division Name: {info?.divisionName}</Typography>
            <Typography variant="h6" sx={{margin: "30px"}}>
              Division Name: {info?.companyName}
            </Typography>
            <Box>
              <Typography variant="h6" sx={{margin: "30px"}}>Area Information:</Typography>
              {
                info?.areaInfo?.map((item)=>{
                  return(
                    <Typography key={item._id} sx={{margin: "30px"}}>{item?.areaName}: {item?.areaContact}</Typography>
                  )
                })
              }
            </Box>
            <Box sx={{ display: "flex", gap: 4, margin: "30px" }}>
              <Link to={`/admin/division/edit/${id}?divisionName=${info?.divisionName}&companyName=${info?.companyName}`} style={{textDecoration: "none"}}>
              <Button color="success" variant="contained">
                Edit
              </Button>
              </Link>
              <Button color="error" variant="contained" onClick={()=>{
                handleDelete(id);
              }}>
                Delete
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DivisionVIewPage;
