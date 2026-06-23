const express = require("express");
const cors = require("cors");

const app = express();
const router = express.Router();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");

const cartRoutes = require("./routes/cart");


connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


app.use("/api/cart", cartRoutes);

