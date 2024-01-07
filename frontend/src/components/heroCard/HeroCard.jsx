import "./style.css";
import React from "react";
// import Division from "../../asset/decomposition.png";
import {  ArrowForward } from "@mui/icons-material";

const HeroCard = ({text, icon}) => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      <div className="infotop">
        <img src={icon} style={{ width: "60%" }} />
        <br />
        <div className="name">{text}</div>
        <br />
        
      </div>
      {/* <div className="arrow">
        <ArrowForward sx={{fontSize: "40px", color: "#B06161", marginTop: "210px"}}/>
    
      </div> */}
    </div>
  );
};

export default HeroCard;
