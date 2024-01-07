import React, { useState } from 'react'
import "./style.css"
import { Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import auth from '../../controller/auth.controller';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const {state, dispatch} = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(state)

  const loginSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email address!!").required(),
    password: Yup.string().required().min(6, "Password must be at least 6 characters!!!")
  })

const {register, handleSubmit, formState: {errors}} = useForm({
  resolver: yupResolver(loginSchema),
});
  const handleLogin = async(data) => {
    try {
      setLoading(true);
      const response = await auth.login(data);
      localStorage.setItem("AccessToken", response?.data?.data.AccessToken);
      dispatch({type: 'login', payload: response?.data?.data});
    
      toast.success(response?.data?.msg);
      navigate('/admin')
      

    } catch (error) {
      // console.error(error);
      toast.error(error?.response?.data?.msg);
      // console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
   <Box sx={{marginBottom: "50px", height: '50vh'}}>
    <form className="form" onSubmit={handleSubmit(handleLogin)}>
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="email" placeholder="Enter email" {...register('email', { required: true })}/>
          {errors.email && <p style={{color: "red"}}>{errors?.email.message}</p>}

          <span>
          </span>
      </div>
      <div className="input-container">
          <input type="password" placeholder="Enter password" {...register('password', {required: true})}/>
          {errors.password && <p style={{color: "red"}}>{errors?.password.message}</p>}

        </div>
         <button type="submit" className="submit">
       {
        !loading ? "Sign in" : "Loading......"
       }
      </button>

   
   </form>
   
   </Box>
  
   </>
  )
}

export default LoginForm