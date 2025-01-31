const express = require("express");
const User = require("./model/user.model.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./connection/database.js");
require("dotenv").config({
  path: "./.env",
});

const app = express();
app.use(cors({ origin: "https://user-management-app-rose-seven.vercel.app/" }));
app.use(bodyParser.json());

app.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("data saved successfully");
  } catch (err) {
    res.status(400).send(err.message);
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
