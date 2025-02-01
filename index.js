require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const connection = require("./connections/mysql");
const PORT = process.env.PORT || 5000;





// Connecting to mysql DB
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

process.on("SIGINT", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing connection:", err.stack);
      process.exit(1);
    }
    console.log("MySQL connection closed");
    process.exit(0);
  });
});




app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
