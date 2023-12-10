const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (err) {
    console.log(err);
    console.log("Database connection failed!");
  }
};

module.exports = connectToDB;
