import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// import postRoutes from "./routes/postRoutes.js";

import doctorsRoute from "./routes/doctorsRoute.js"
import doctorCategoryRoute from "./routes/doctorCategoryRoute.js"
import cors from "cors";

// sslcommerz controller link
// const payNow = require("./controllers/paynow.js");

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// app.use("/api/v1/post", postRoutes);

app.use("/api/v1/doctors", doctorsRoute);
app.use("/api/v1/doctorCategory", doctorCategoryRoute);

//ssl commerz api link
// app.use("/api/payment",payNow);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Family Care</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
