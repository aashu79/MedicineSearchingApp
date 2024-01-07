import { LocalDiningRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AddCircleOutlineRounded, Delete, Edit } from "@mui/icons-material";
import MedicineSvc from "../../../controller/medicine.controller";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MedicineListingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const token = localStorage.getItem("AccessToken");
          // console.log(token);

          if (token) {
            const response = await MedicineSvc.deleteMedicine(token, id);

            window.location.reload();
            toast.success(response?.data?.data?.msg);

            Swal.fire({
              title: "Deleted!",
              text: "Medicine deleted successfully.....",
              icon: "success",
            });
          }
        } catch (error) {
          toast.error(error.response.data.msg);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const getAllMedicines = async () => {
    try {
      setLoading(true);
      const response = await MedicineSvc.getAllMedicine();
      // console.log(response)
      setMedicine(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMedicines();
  }, []);
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "70px",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <h1>Available Medicines: </h1>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Add New Medicine</Typography>
            <Link to={"/admin/medicine/create"}>
              <AddCircleOutlineRounded
                sx={{ fontSize: "100px", color: "green", cursor: "pointer" }}
              />
            </Link>
          </Box>
          <TableContainer component={Paper} sx={{ margin: "20px" }}>
            <Table
              sx={{ minWidth: 700, width: "auto" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Brand Name</TableCell>
                  <TableCell align="center">Generic Name</TableCell>
                  <TableCell align="center">Company Name</TableCell>
                  <TableCell align="center">Division Name</TableCell>
                  <TableCell align="center">Available Strength</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!medicine ? (
                  <TableRow>
                    <TableCell>No medicine found</TableCell>
                  </TableRow>
                ) : (
                  medicine?.map((row) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        &nbsp;&nbsp; {row?.brandName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.genericName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.companyName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.divisionName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.strength.map((d) => {
                          return d;
                        })}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link
                          to={
                            "/admin/medicine/edit/" +
                            row?._id +
                            "?" +
                            `brandName=${row.brandName}&genericName=${row.genericName}&companyName=${row.companyName}&divisionName=${row.divisionName}&strength=${row.strength}`
                          }
                        >
                          <Edit
                            sx={{
                              color: "blue",
                              fontSize: "20px",
                              display: "inline-block",
                            }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          onClick={() => {
                            handleDelete(row._id);
                          }}
                        >
                          <Delete
                            sx={{
                              color: "red",
                              fontSize: "20px",
                              display: "inline-block",
                            }}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default MedicineListingPage;
