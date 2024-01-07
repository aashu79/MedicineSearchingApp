import { Box, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./button/Button";
import { Menu } from "@mui/icons-material";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
          },
          justifyContent: "space-between",
          background: "#7ED7C1",
          width: "100%",
          padding: "15px",
        }}
      >
        <Box sx={{ marginLeft: "20px" }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography variant="h3">REMED</Typography>
          </Link>
        </Box>
        <Box
          sx={{
            marginLeft: "20px",
            padding: "12px",
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
            },
            width: "45%",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              padding: "3px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                whiteSpace: "nowrap",
                ":hover": { color: "white" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link
            to={"/medicine"}
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              padding: "3px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                whiteSpace: "nowrap",
                ":hover": { color: "white" },
              }}
            >
              Medicine
            </Typography>
          </Link>
          <Link
            to={"/division"}
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              padding: "3px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                whiteSpace: "nowrap",
                ":hover": { color: "white" },
              }}
            >
              Division
            </Typography>
          </Link>
          <ScrollLink to="about" smooth={true} duration={500} style={{cursor: "pointer"}}>
            <Typography
              sx={{
                fontSize: "18px",
                whiteSpace: "nowrap",
                ":hover": { color: "white" },
              }}
            >
              About Us
            </Typography>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} style={{cursor: "pointer"}}>
            <Typography
              sx={{
                fontSize: "18px",
                whiteSpace: "nowrap",
                ":hover": { color: "white" },
              }}
            >
              Contact Us
            </Typography>
          </ScrollLink>
        </Box>
        <Link to={"/login"} style={{ textDecoration: "none", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <Button Value={"Login"} />
          </Box>
        </Link>
      </Box>

      {/*---------------------- For small device ------------------------*/}

      {/* <StyledBox sx={{background: "#7ED7C1"}}> */}
      <Box
        sx={{
          padding: "5px",
          background: "#7ED7C1",
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
          },
          // justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
            },
            alignItems: "center",
            fontSize: "200px",
            marginLeft: "10px",
          }}
          onClick={() => {
            setMobileOpen(!mobileOpen);
          }}
        >
          <Menu fontWeight="bold" />
        </Box>
        <Box sx={{ margin: "2px auto 2px auto" }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography variant="h3">REMED</Typography>
          </Link>
        </Box>

        <Drawer open={mobileOpen} onClose={handleDrawerToggle}>
          <Box sx={{ padding: "10px", marginLeft: "5px", marginRight: "5px" }}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
                padding: "3px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  ":hover": { color: "white" },
                }}
              >
                Home
              </Typography>
            </Link>
            <Link
              to={"/medicine"}
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
                padding: "3px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  ":hover": { color: "white" },
                }}
              >
                Medicine
              </Typography>
            </Link>
            <Link
              to={"/division"}
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
                padding: "3px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  ":hover": { color: "white" },
                }}
              >
                Division
              </Typography>
            </Link>
            <ScrollLink
              to="about"
              smooth={true} duration={500}
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
                padding: "3px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  ":hover": { color: "white" },
                }}
              >
                About Us
              </Typography>
            </ScrollLink>
            <ScrollLink
            smooth={true} duration={500}
              to="contact"
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
                padding: "3px",
                cursor: "pointer"
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  ":hover": { color: "white" },
                }}
              >
                Contact Us
              </Typography>
            </ScrollLink>
          </Box>
        </Drawer>
      </Box>

      {/* ----------------------------------------- */}
      {/* </StyledBox> */}
    </>
  );
};

export default Navbar;
