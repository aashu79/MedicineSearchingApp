import { Box, Typography } from "@mui/material";
import Medicine from "../asset/pharma.png";

const AboutUs = () => {
  return (
    
    <Box
    
      sx={{
        marginTop: "40px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}

    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "25px",
          alignItems: "center",
          width: {
            xs: "80%",
            sm: "80%",
            md: "50%",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            alignItems: "center",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          About Us
        </Typography>
        <Box sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: "18px", textAlign: "center" }}>
            Finding the information you need about your medication has never
            been easier. Our platform offers a comprehensive database accessible
            by generic name, brand name, or company representative number.
            Whether you're looking for specific details about a medication or
            just browsing for options, we have everything you need at your
            fingertips.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: { xs: "80%", sm: "80%", md: "50%", margin: "10px auto 10px auto" } }}>
        <img src={Medicine} style={{ width: "80%" }} />
      </Box>
    </Box>
    
  );
};

export default AboutUs;
