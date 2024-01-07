import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Drawer,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { AccountTreeOutlined, Business, ContactEmergency, Medication } from "@mui/icons-material";
import { toast } from "react-toastify";

const AdminPageLayout = () => {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { state } = useUserContext();
  const { userName } = state;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
    toast.success("logout successful...");
  }


  return (
    <>
      <AppBar position="static" color="info">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <AccountCircle />
              <span>{userName}</span>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                sx: {
                  "& .MuiMenuItem-root": {
                    display: "flex",
                    alignItems: "center",
                    "& .MuiSvgIcon-root": {
                      marginRight: 10,
                    },
                  },
                },
              }}
            >
              <MenuItem>
               <Box onClick={()=>{handleLogOut()}}> <Typography>Logout</Typography></Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={handleDrawerToggle} anchor="left">
        <Box sx={{ width: 256 }} role="presentation">
          <List>
         
            <Link
              to={"/admin/company"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box sx={{display: "flex", gap: 3, margin: "20px"}}>
                <Business />
                <Typography variant="inherit">Company</Typography>
              </Box>
            </Link>

            <Link
              to={"/admin/medicine"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box sx={{display: "flex", gap: 3, margin: "20px"}}>
                <Medication />
                <Typography variant="inherit">Medicine</Typography>
              </Box>
            </Link>

            <Link
              to={"/admin/division"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box sx={{display: "flex", gap: 3, margin: "20px"}}>
                <AccountTreeOutlined />
                <Typography variant="inherit">Division</Typography>
              </Box>
            </Link>
            <Link
              to={"/admin/contact"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box sx={{display: "flex", gap: 3, margin: "20px"}}>
                <ContactEmergency />
                <Typography variant="inherit">Contact Us</Typography>
              </Box>
            </Link>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg">
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            
            <Outlet />
          </Box>
         
        </Box>
      </Container>
    </>
  );
};

export default AdminPageLayout;
