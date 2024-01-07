import React, { useEffect, useState } from 'react';
import LoginForm from "../components/loginForm/LoginForm"
import { Box } from '@mui/material';
import authSvc from "../controller//auth.controller"
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
const {dispatch} = useUserContext();
const navigate = useNavigate();



  
  useEffect(() =>{
    const token = localStorage.getItem("AccessToken");
    if(token){
      navigate('/admin');
    }
  },[])


  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "80px", marginBottom: "80px"}}>
   
     <LoginForm/>
    </Box>
  )
}

export default LoginPage