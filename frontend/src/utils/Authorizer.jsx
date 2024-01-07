import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authSvc from "../controller/auth.controller";
import { useUserContext } from "../context/userContext";
import { Box } from "@mui/material";
import Loader from "../components/loader//Loader"





const Authorizer = ({  component }) => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

const {dispatch, state} = useUserContext();


  const getUserOn = async(token) => {
    try {
      setLoading(true);
      if (token) {
        const user = await authSvc.getUser(token);
        dispatch({type: "setUser", payload: user.data.data});
       
  
      }
      
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
      
    }finally{
      setLoading(false);
    }
  
  }

 
const {isVerified} = state;
 
  
  

  useEffect(() => {
 const token = localStorage.getItem("AccessToken");
 

 if(token){
  getUserOn(token);
 }
 if(!token){
  navigate('/login');
  setLoading(false);
 }

  }, []);


if(loading) {
  return(
    <Box sx={{height: "50vh", margin: "40px auto 40px auto"}}><Loader/> </Box>
  )
}
if(!loading){
  if(isVerified) {
    return component;
  }
}

  
};

export default Authorizer;
