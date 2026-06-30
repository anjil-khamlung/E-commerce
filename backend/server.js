require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const esewaRoutes = require("./routes/esewaRoutes");

const PORT = process.env.PORT || 5000;


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/esewa", esewaRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});