const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const uri =
      "mongodb+srv://Prashant178:2yOFEHVq2epFtVDH@test.nbiivqk.mongodb.net/Bank";
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
