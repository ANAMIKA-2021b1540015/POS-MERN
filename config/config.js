const mongoose = require("mongoose");
require("colors");

//coonection Functions

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB Connected`.bgGreen.white.bold);
  } catch (error) {
    console.log("Error connecting to DB".bgRed.white.bold, error);
    process.exit(1);
  }
};

//export
module.exports = connectDb;
