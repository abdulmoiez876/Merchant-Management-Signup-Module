const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const router = express.Router();

const User = require("../models/user");

router.post(
  "/signup",
  [
    check("name").exists(),
    check("username").exists(),
    check("email").exists().isEmail(),
    check("mobileNumber").exists().isMobilePhone(),
    check("password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, mobileNumber, password } = req.body;

    // Check if user already exists in DB
    try {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in DB
    const newUser = new User({
      name,
      username,
      email,
      mobileNumber,
      password: hashedPassword,
    });
    try {
      await newUser.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token
    return res.json({ token });
  }
);

module.exports = router;
