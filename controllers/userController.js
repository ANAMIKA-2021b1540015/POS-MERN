const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Login failed", user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new userModel({ ...req.body, verified: true });
    await newUser.save();
    res.send("User Registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { loginController, registerController };
