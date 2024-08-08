const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = process.env.DB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
})
// Import routes
const employeeRoutes = require("./routes/employee.route");
const categoryRoutes = require("./routes/category.route");
//routes
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/category", categoryRoutes);



// Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
