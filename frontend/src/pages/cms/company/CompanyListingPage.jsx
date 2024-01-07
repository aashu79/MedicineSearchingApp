import React, { useEffect, useState } from "react";
import CompanySvc from "../../../controller/company.controller";
import Loader from "../../../components/loader/Loader";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AddCircleOutlineRounded, Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const CompanyListingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState();
  const getAllCompanyListing = async () => {
    try {
      setLoading(true);
      const companyListing = await CompanySvc.getAllCompany();
      
      setCompany(companyListing?.data?.data);
      // console.log(company);
    } catch (error) {
      toast.error(error.response.data.msg);
          console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const deleteCompany = async (id) => {
  //   try {
  //     const token = localStorage.getItem('AccessToken');
  //    if(token){
  //     const response = await CompanySvc.deleteCompany(token, id);
  //     console.log("here i am")
  //     console.log(response);
  //    }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.msg);
          
  //   }
  // }

  const handleDelete = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const token = localStorage.getItem('AccessToken');
          // console.log(token);
        
         if(token){
          const response = await CompanySvc.deleteCompany(token, id);
          
          window.location.reload();
          toast.success(response?.data?.data?.msg);

          
          Swal.fire({
            title: "Deleted!",
            text: "Company deleted successfully.....",
            icon: "success"
          });
         }
        } catch (error) {
          console.log(error);
        }
        finally {
          setLoading(false);
        }
        
      }
    });
  }

  useEffect(() => {
    getAllCompanyListing();
  }, []);
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "70px",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <h1>Listed Company: </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!company ? (
                  <TableRow><TableCell>No company found</TableCell></TableRow>
                ) : (
                  company?.map((row) => (
                    <TableRow
                      key={row?.companyName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.companyName}
                      </TableCell>
                      <TableCell align="right">
                       <Link to={'/admin/company/edit/'+row?._id}>
                       <Edit sx={{ color: "blue", fontSize: "20px" }} />
                       </Link>  |{" "}
                       <Button onClick={()=>{handleDelete(row._id)}}>
                       <Delete sx={{ color: "red", fontSize: "20px" }}/>
                       </Button>
                       
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Add Company</Typography>
            <Link to={"/admin/company/create"}>
              <AddCircleOutlineRounded
                sx={{ fontSize: "100px", color: "green", cursor: "pointer" }}
              />
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default CompanyListingPage;
