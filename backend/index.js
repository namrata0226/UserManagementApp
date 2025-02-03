const express = require("express");
const User = require("./model/user.model.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./connection/database.js");
require("dotenv").config({
  path: "./.env",
});

const app = express();
app.use(cors());
app.use(cors({ origin: "*", credentials: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://user-management-app-rose-seven.vercel.app",
  "https://user-management-app-9s6b.vercel.app/",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(bodyParser.json());

app.post("/add", async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists" });
    }

    const newUser = new User({ firstname, lastname, email, phone });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone } = req.body;
    if (!firstname || !lastname || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phone },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

db()
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
