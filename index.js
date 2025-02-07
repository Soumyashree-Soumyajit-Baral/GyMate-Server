require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const jwt=require("jsonwebtoken")
const app = express();
// const connection = require("./connections/mysql");
// const userModal = require("./models/user")
const userRouter = require("./routers/user")
const unProtectedRoutes=["/signup", "/login", "/getotp", "/verifyotp"]
const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DATABASE



// Middlewares

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use((req,res,next)=>{
  if(unProtectedRoutes.includes(req.url)){
      next()
  }else{
      if(req.headers.authorization){
          jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err,mobile)=>{
              if(err){
                  return res.sendStatus(403)
              }
              req.mobile=mobile
              next();
          })
      }else{
          res.send("Authorization required")
      }
  }
})


app.use("/", userRouter)


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

// MongoDB connection
// mongoose.connect(`${DATABASE}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error("MongoDB connection error:", err));


mongoose.connect(`${DATABASE}`,()=>{
  console.log('connected to db');
  // console.log(DATABASE)
},(err)=>{
  console.log(err);
})





app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
