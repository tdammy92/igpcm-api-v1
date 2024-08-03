const mongoose = require("mongoose");
// process.env.S3_BUCKET

// mongodb://localhost:27017/

const DB_Url =`mongodb+srv://ihdm:${process.env.DATABASE_PASSWORD}@bilek.f0ej3.mongodb.net/ipcmDb?retryWrites=true&w=majority`;

// console.log("node app enviroment", DB_Url);
mongoose.connect(DB_Url, {});

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "DB was unable to connect connection error 🛑")
);

db.once("open", function () {
  console.log("Database is connected successfully 🚀");
});


db.on('disconnected', () => {
  console.log('Disconnected from MongoDB ❌');
});