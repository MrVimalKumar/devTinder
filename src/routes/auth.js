const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utlis/validation");
const validator = require("validator");
const { User } = require("../models/user");

// SignUp API
authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // validate the Data
    validateSignUpData(req);
    //  Encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a New User instance & storing new user in DB
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await jwt.sign(
      { _id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
     res.cookie("token", token, {
        httpOnly: true, 
        secure: true, 
        sameSite: "None", 
      });
    res.json({ message: "SignUp Successfull", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw new Error("Enter the valid Email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // Comparing the passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true, 
        secure: true, 
        sameSite: "None", 
      });

      res.json({
        message: "Logged In Successfull",
        data: user,
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Logut API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successfull");
});

module.exports = { authRouter };
