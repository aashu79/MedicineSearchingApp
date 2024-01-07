import React from "react";
import HeroCard from "./heroCard/HeroCard";
import { Grid } from "@mui/material";
import Medicine from "../asset/medicine.png";
import Division from "../asset/agent.png";
import { Link } from "react-router-dom";

const HeroCardSection = () => {
  return (
    <Grid container>
      <Grid item  xs={12} sm={12} md={6}>
        <Link to={'/medicine'} style={{textDecoration: "none"}} afterNavigation={() => window.scrollTo(0, 0)}>
        
        <HeroCard text={"Search Medicine by Brand/Generic Name"} icon={Medicine} />
        </Link>
      </Grid>
      <Grid  item xs={12} sm={12} md={6}>
        <Link to={'/division'} style={{textDecoration: "none"}} afterNavigation={() => window.scrollTo(0, 0)}>
        
        <HeroCard text={"Search MR contact number"} icon={Division} />
        </Link>
      </Grid>
    </Grid>
  );
};

export default HeroCardSection;
