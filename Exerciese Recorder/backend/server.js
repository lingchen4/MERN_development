const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

//use middleware
app.use(cors());
app.use(express.json());

const db = process.env.ATLAS_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/exercises", require("./route/exercise"));
app.use("/users", require("./route/user"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
