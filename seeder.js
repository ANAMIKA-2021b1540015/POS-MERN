const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config.js");
const itemModel = require("./models/itemModels.js");
const items = require("./utils/data.js");

require("colors");
//config
dotenv.config();
connectDb();

//function seeder
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items);
    console.log("All items added successfully".bgGreen);
    process.exit(0);
  } catch (error) {
    console.log(`${error.message}`.bgRed.inverse);
    process.exit(1);
  }
};

importData();
