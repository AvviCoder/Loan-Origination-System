// database connection mechanism is present here
// const mongoose = require("mongoose");

// const connectDB = async() =>{
//     try{
//       await mongoose.connect(process.env.MONGO_URI, {
//          UseUnifiedTopology:true,
//          useNewUrlparser:true,
//       })
//       console.log("The database is successfully connected");
//     }catch(error){
//       console.log(error.message);
//       console.log("Error occured while connecting with the database");
//       process.exit(1);
//     }
// }

// module.exports = connectDB;

// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
