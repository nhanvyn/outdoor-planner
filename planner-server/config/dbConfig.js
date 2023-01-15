const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    const uri = process.env.DATABASE_URI;
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
  } catch (e) {
    console.log("error: ", e);
  }
}

module.exports = connectToDB