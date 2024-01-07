const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

//Module imports
const connect = require("./utilis/dbConnection");
const errorHandler = require("./middelwares/errorHandlers/globalErrorHandler");
const medicineRoute = require("./routes/medicine.routes");
const companyRoute = require("./routes/company.routes");
const divisionRoute = require("./routes/division.routes");
const authRoute = require("./routes/auth.routes");
const contactUsRoute = require("./routes/contactUs.routes")
const homeRoute = require("./routes/home.route");

//middelwares
app.use(express.json());
app.use(cors());

//Routes
app.use('/', homeRoute );
app.use("/api/v1/medicine", medicineRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/division", divisionRoute);
app.use("/api/v1/auth", authRoute)
app.use('/api/v1/contact', contactUsRoute)

//Global Error Handler
app.all("*", (req, res, next) => {
  const newError = new Error("Route not found..");
  newError.statusCode = 404;
  throw newError;
});

app.use(errorHandler);

// App configuration

const start = async () => {
  try {
    const conn = await connect();
    console.log("Connected to database...");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}...`); //
    });
   
  } catch (err) {
    console.error(err);
  }
};
start();


