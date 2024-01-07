import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DivisionCard = ({ id, divisionName, companyName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        borderRadius: "10px",
        gap: 3,
        // boxShadow: "2px white",
        border: "2px solid black",
        width: "300px",
        height: "240px",

        boxShadow: "5px 5px 15px 5px #000000",
      }}
    >
      <Typography sx={{ whiteSpace: "nowrap" }}>
        Division Name: {divisionName}
      </Typography>

      <Typography>Company Name: {companyName}</Typography>
      <Link to={"/admin/division/" + id}>
        <Button
          color="success"
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          More Info
        </Button>
      </Link>
    </Box>
  );
};

export default DivisionCard;
