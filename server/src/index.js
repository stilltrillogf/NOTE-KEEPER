const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./router");

const port = 3000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(router);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`starting on port ${port}`);
  app.listen(port);
});
