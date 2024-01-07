import {
  Box,
  Grid,
  OutlinedInput,
  Typography,
  Button as MButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Search from "../asset/search.png";
import SearchSvc from "../controller/search.controller";
import Loader from "../components/loader/Loader";
import MedicineCard from "../components/medicineCard/MedicineCard";
import { useNavigate } from "react-router-dom";

const MedicinePage = () => {
  const [textVisible, setTextVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    try {
      if(query){
        setLoading(true);
      const response = await SearchSvc.getMedicine(query);
      // console.log(response);
      setResult(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <>
        {textVisible && (
          <Box sx={{ display: "block", height: "70vh" }}>
            <Box
              sx={{
                display: "flex",
                margin: "2px auto 2px auto",
                width: "95%",
                alignItems: "center",
              }}
            >
              <OutlinedInput
                placeholder="Enter Generic or Brand Name.."
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                sx={{
                  border: "1px solid black",
                  width: "100%",
                  borderRadius: "50px",
                  bgcolor: "white",
                  margin: "5px",
                }}
              />
              <Box
                onClick={() => {
                  if(query){
                    setTextVisible(false);
                  handleSearch(query);
                  }
                }}
              >
                <Button Value={"Search"} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "100%", md: "50%" },
                justifyContent: "center",
                alignItems: "center",
                margin: "40px auto 40px auto",
              }}
            >
              <Typography
                variant="h2"
                sx={{ color: "#B06161", textAlign: "center" }}
              >
                Search by
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "#DC8686", textAlign: "center" }}
              >
                generic or brand name of a medicine,
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "black", textAlign: "center" }}
              >
                and we'll find the information you need...
              </Typography>
              <img src={Search} style={{ width: "30%" }} />
            </Box>
          </Box>
        )}
      </>
      <>
        {!textVisible && (
          <Box sx={{ width: "90%", margin: "18px" }}>
            <Grid container spacing={4}>
              {loading ? (
                <Box sx={{ height: "50vh", margin: "30px auto 30px auto" }}>
                  {" "}
                  <Loader />
                </Box>
              ) : !result ? (
                <Box
                  sx={{
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "20px auto 20px auto"
                  }}
                >
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    No result found for: {query}
                  </Typography>
                  <MButton
                    variant="contained"
                    sx={{ margin: "10px auto 10px auto" }}
                    onClick={() => {
                      location.reload();
                    }}
                  >
                    Go Back
                  </MButton>
                </Box>
              ) : (
                <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <Typography
                    variant="h5"
                    sx={{ margin: "20px",}}
                  >
                    Results For: {query}
                  </Typography>
                 <Grid container spacing={5} sx={{width: "100%", margin: "10px auto 10px auto"}}>
                 {result?.map((item) => {
                    return (
                      <Grid item xs={12} sm={12} md={6} lg={4} >
                        <MedicineCard item={item.item} />
                      </Grid>
                    );
                  })}
                 </Grid>
                  <MButton
                    variant="contained"
                    sx={{ margin: "20px auto 10px auto" }}
                    onClick={() => {
                      location.reload();
                    }}
                  >
                    Go Back
                  </MButton>
                </Box>
              )}
            </Grid>
          </Box>
        )}
      </>
    </>
  );
};

export default MedicinePage;
