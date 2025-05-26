const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const path = require("path");
const connectDB = require("../config/db");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

// Import User model
const User = require("../models/User");

// Connect to MongoDB
connectDB();

// Create admin user
const createAdmin = async () => {
  const name = "Super Admin";
  const email = "admin@school.com";
  const password = "admin123";
  const role = "admin";

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({ name, email, password: hashedPassword, role });
    await admin.save();

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
