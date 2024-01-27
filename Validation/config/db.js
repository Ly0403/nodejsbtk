const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGOURL);
    return con;
  } catch (error) {
    console.log(error);
  }
};


module.exports = connectDB;
