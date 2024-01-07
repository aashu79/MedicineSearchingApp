import React, { useEffect, useState } from "react";
import ContactUsSvc from "../../../controller/contactUs.controller"
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

const ContactUsListingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contactUs, setContactUs] = useState();
  const getAllContactUsListing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('AccessToken');
      if (token) {
        const response = await ContactUsSvc.getAllContactUs(token);
        console.log(response);
        setContactUs(response?.data?.data);
      }
    
    } catch (error) {
      toast.error(error.response.data.msg);
          console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

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
          const response = await ContactUsSvc.deleteContactUs(token, id);
          
          window.location.reload();
          toast.success(response?.data?.data?.msg);

          
          Swal.fire({
            title: "Deleted!",
            text: "Contact Us message deleted successfully.....",
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
    getAllContactUsListing();
  }, []);
  return (
    <>
      {loading ? (
        <Box
          sx={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            width: "90%",
            margin: "70px auto 70px auto",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <h1>Contact Us: </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">phone</TableCell>
                  <TableCell align="center">message</TableCell>
                  
                  <TableCell align="right">delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!contactUs ? (
                  <TableRow><TableCell>No contact us message found</TableCell></TableRow>
                ) : (
                  contactUs?.map((row) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {row?.name}
                      </TableCell>
                      <TableCell align="center">
                       {row?.email}
                      </TableCell>
                      <TableCell align="center">
                       {row?.number}
                      </TableCell>

                      <TableCell align="center">
                       {row?.message}
                      </TableCell>
                      
                      <TableCell align="center">
                       
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
            
          </Box>
        </>
      )}
    </>
  );
};

export default ContactUsListingPage;
