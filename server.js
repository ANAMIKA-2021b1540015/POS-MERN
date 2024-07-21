const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
// const cors = require("cors");
const dotenv = require("dotenv");
require("colors");

// //connect to db
const connectDb = require("./config/config.js");

// //dotenv config
dotenv.config();

// //db config
connectDb();

//rest object
const app = express();

// //middlewares
// app.use(cors);
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan("dev"));

app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));

app.get("/", function (req, res) {
  res.send("Welcome to Website?");
});

//using .env file-> port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgWhite.green.bold);
});
