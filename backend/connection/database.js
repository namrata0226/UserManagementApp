const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}`);
};
module.exports = db;
