import { Typography } from '@mui/material';
import React from 'react'

const CompanyDivisionCard = ({data}) => {
    const {companyName, divisionName} = data
  return (
    <Box
          sx={{
            margin: "10px auto 10px auto",
            padding: "10px",
            border: "1px solid black",
            borderRadius: "20px",
            width: "300px",
            WebkitBoxShadow: "9px 10px 51px -14px rgba(0,0,0,0.75)",
            mozBoxShadow: "-9px 10px 51px -14px rgba(0,0,0,0.75)",
            boxShadow: "-9px 10px 51px -14px rgba(0,0,0,0.75",
          }}
        >

            <Typography variant='h5' sx={{color: "blue"}} >Compnay Name: {companyName}</Typography>
            <Typography variant='h5' sx={{color: "red"}} >Division Name: {divisionName}</Typography>
            <Typography variant='h5'>AreaInfo: </Typography>
            
        </Box>
  )
}

export default CompanyDivisionCard;