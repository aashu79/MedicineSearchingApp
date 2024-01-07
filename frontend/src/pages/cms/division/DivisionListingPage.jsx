import React, { useEffect, useState } from 'react'
import DivisionCard from '../../../components/divisionCard/DivisionCard'
import { Box, Grid, Typography } from '@mui/material'
import DivisionSvc from '../../../controller/division.controller'
import Loader from "../..//../components/loader/Loader";
import { Link } from 'react-router-dom';
import { AddCircleOutlineRounded } from '@mui/icons-material';

const DivisionListingPage = () => {
  const [loading, setLoading] = useState(false)
  const [division, setDivision] = useState();
  const getAllDivisions = async() =>{

    try {
      setLoading(true);
      const response = await DivisionSvc.getAllDivision(false);
      // console.log(response);
      setDivision(response?.data?.data);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllDivisions();
  },[]);
  
  
  return (
    <Box>
      <Box sx={{margin: "20px"}}><h1>Listed Divisions:</h1></Box>

      <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Add New Division</Typography>
            <Link to={"/admin/division/create"}>
              <AddCircleOutlineRounded
                sx={{ fontSize: "100px", color: "green", cursor: "pointer" }}
              />
            </Link>
          </Box>
      <Box sx={{margin: "50px auto 50px auto"}}>
        <Grid container spacing={8} sx={{margin: "50px auto 50px auto"}}>
          {
            loading ? (<Box><Loader/></Box>) : (
              !division ? (<Box>No division info found</Box>) : (
                division?.map((item)=>{
                  return(
                    <Grid item xs={12} sm={12} md={6} lg={4} key={item._id}>
                      <DivisionCard id={item._id} divisionName={item.divisionName} companyName={item.companyName}/>
                    </Grid>
                  )
                })
              )
            )
          }
        </Grid>
      </Box>
      
    </Box>
  )
}

export default DivisionListingPage