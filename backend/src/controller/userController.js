const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const MY_SECRET_KEY = "my_jwt_secret";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
const generateVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000);

const signupUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationCode = generateVerificationCode();
    const emailVerificationCodeExpires = new Date(Date.now() + 3600000);

    const user = new User({
      name,
      email,
      age,
      password: hashedPassword,
      emailVerificationCode,
      emailVerificationCodeExpires,
    });

    await user.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Email Verification Code",
      text: `Your email verification code is ${emailVerificationCode}. It will expire in 1 hour.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ error: "Error sending verification email" });
      }
      res.status(201).json({
        user,
        message: "User signup successfully. Please verify your email.",
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({
      emailVerificationCode: code,
      emailVerificationCodeExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationCodeExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationCodeExpires = undefined;

    await user.save();

    res.status(201).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Email does not exist! Please create an account first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, MY_SECRET_KEY, {
      expiresIn: "12h",
    });

    user.tokens = user.tokens.concat({ token });

    await user.save();

    res.status(200).json({ user, token, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logOutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Error logging out user:", error);
    res
      .status(500)
      .json({ error: "Error logging out. Please try again later." });
  }
};
const getLoggedinUser = async (req, res) => {
  try {
    const userId = req.userID;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Access denied. Only admins can access this route." });
    // }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const updatedFields = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedFields.address) {
      user.address = { ...user.address, ...updatedFields.address };
    }
    user.name = updatedFields.name || user.name;
    user.age = updatedFields.age || user.age;
    user.mobileNo = updatedFields.mobile || user.mobileNo;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res
      .status(500)
      .json({ error: "Failed to update profile. Please try again later." });
  }
};
const cleanUpExpiredTokens = async () => {
  try {
    await User.updateMany(
      { "tokens.expiresAt": { $lte: new Date() } },
      { $pull: { tokens: { expiresAt: { $lte: new Date() } } } }
    );
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
};
setInterval(cleanUpExpiredTokens, 2 * 60 * 60 * 1000);

module.exports = {
  signupUser,
  signinUser,
  getLoggedinUser,
  getAllUsers,
  cleanUpExpiredTokens,
  verifyEmail,
  updateProfile,
  logOutUser,
};
