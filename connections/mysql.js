require("dotenv").config();            // Load environment variables from .env file
const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});


// Connecting to mysql DB
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err.stack);
//     return;
//   }
//   console.log("Connected to MySQL as id " + connection.threadId);
// });

// process.on("SIGINT", () => {
//   connection.end((err) => {
//     if (err) {
//       console.error("Error closing connection:", err.stack);
//       process.exit(1);
//     }
//     console.log("MySQL connection closed");
//     process.exit(0);
//   });
// });



// Example query to select data from a table

// connection.query("SELECT * FROM users", (err, results) => {
//   if (err) {
//     console.error("Error executing query:", err.stack);
//     return;
//   }
//   console.log("Results:", results); // Logs the query results
// });

// Example query to insert data into a table

const user = { name: "John Doe", email: "john.doe@example.com" };

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

module.exports = connection
