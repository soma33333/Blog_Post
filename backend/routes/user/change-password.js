const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../../models/User");
const change_password = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "2020an0120743@gmail.com",
    pass: "hbuu kkxo ruph czbn",
  },
});

const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: "2020an0120743@gmail.com",
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP is ${otp}. Please use this to verify your email.`,
    });
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

change_password.post("/email-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = generateOTP();
    const emailSent = await sendOtpEmail(email, otp);
    if (emailSent) {
      res.status(200).json(otp);
    } else {
      res.status(500).json({ message: "Error sending OTP." });
    }
  } catch (error) {
    res.status(500).json({ message: "Email Not found", error });
  }
});

change_password.post("/set-new-password", async (req, res) => {
  const { email, newpassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error resetting password", error });
  }
});

module.exports = change_password;
