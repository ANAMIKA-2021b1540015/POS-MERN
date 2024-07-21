const express = require("express");
const {
  loginController,
  registerController,
} = require("./../controllers/userController.js");

const router = express.Router();

//routes
router.post("/login", loginController);

//MEthod - POST
router.post("/register", registerController);

module.exports = router;
