import { Search } from "@mui/icons-material";
import { Box, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import Button from "./button/Button";
import HeroImage from "../asset/Medicine-amico.png";

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "25px auto 25px auto",
        justifyContent: "space-between",
        flexDirection: "column",
       
      }}
    >
    
      <Box sx={{display: "flex", flexDirection: {xs: "column", sm: "column", md: "row", margin: "40px"}, justifyContent: "space-between"}}>
        <Box sx={{display: "flex", flexDirection: "column", width: {xs: "100%", sm: "100%", md: "50%"}}}>
        <Typography variant="h2" sx={{color: "#B06161"}}>Don't frust,</Typography>
        <Typography variant="h3" sx={{color: "#DC8686"}}>Get</Typography>
        <Typography variant="h4" sx={{color: "black"}}>Medicine information from us...</Typography>
        </Box>
        
        <Box sx={{width: {xs: "100%", sm: "100%", md: "35%", lg: "30%"}}}><img src={HeroImage} style={{width: "100%"}}/></Box>
      </Box>
    </Box>
  );
};

export default Hero;
