const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const APIRoutes = require("./routes/APIRoutes");
const authRoutes = require("./routes/authRoutes");

const connectCloudinary = require("./config/cloudinary");

require("dotenv").config();

const app = express();

connectCloudinary();
app.use(cors());
app.use(express.json());            
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URI);

app.use(authRoutes);
app.use('/api', APIRoutes);

app.listen(3030);