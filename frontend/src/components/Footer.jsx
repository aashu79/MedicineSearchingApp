import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Typography, colors } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "90px",
        flexDirection: "column",
        padding: "20px",
        width: "100%",
        background: "#F0DBAF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          justifyContent: "space-between",
          margin: "50px",
        }}
      >
        <Box>
          <Typography variant="h3">REMED</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            marginTop: "20px",
          }}
        >
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "10px",
              ":hover": { color: "white" },
            }}
          >
            <Typography>Home</Typography>
          </Link>
          <Link
            to={"/medicine"}
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "10px",
              ":hover": { color: "white" },
            }}
          >
            <Typography>Medicine</Typography>
          </Link>
          <Link
            to={"/division"}
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "10px",
              ":hover": { color: "white" },
            }}
          >
            <Typography>Division</Typography>
          </Link>
          <ScrollLink
            to="about"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "10px",
              cursor: "pointer",
              ":hover": { color: "white" },
            }}
          >
            <Typography>About Us</Typography>
          </ScrollLink>
          <ScrollLink
            to="contact"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "10px",
              cursor: "pointer",
              ":hover": { color: "white" },
            }}
          >
            <Typography>Contact Us</Typography>
          </ScrollLink>
        </Box>
        <Box sx={{ display: "flex", marginTop: "40px" }}>
          <Facebook sx={{ marginLeft: "10px" }} />
          <Instagram sx={{ marginLeft: "10px" }} />
          <Twitter sx={{ marginLeft: "10px" }} />
        </Box>
      </Box>
      <hr color="black" style={{ width: "80%", margin: "5px auto 5px auto" }} />

      <Box>
        <Typography sx={{ textAlign: "center" }}>
          &copy; 2023 medinfo. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
