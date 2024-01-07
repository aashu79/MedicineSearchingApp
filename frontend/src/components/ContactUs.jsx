import React from 'react'
import ContactForm from "./contactForm.jsx/ContactForm"
import { Box, Typography } from '@mui/material'

const ContactUs = () => {
  return (
    
    <Box  sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: "100%"}}>
      <Typography sx={{textAlign: "center", marginBottom: "20px"}} variant='h3'>Contact Us</Typography>
      <ContactForm/>
    </Box>
    
  )
}

export default ContactUs