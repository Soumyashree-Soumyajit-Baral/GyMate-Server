require("dotenv").config();
const express = require('express')
const otpHelper = require("../helpers/getotp")
const verifyOtpHelper = require("../helpers/verifyotp")
const userRouter = express.Router()
const signupHelper = require("../helpers/signup")




userRouter.get('/getotp', (req, res) =>{
    req.body.otp = Math.floor(10000 + Math.random() * 90000)
    otpHelper(req.body, (err, response) => {
        if (err) {
          res.send({ status: 'failed', message: err?.message })
        } else {
          res.send({ status: 'success', data: response })
        }
      })
})

userRouter.post('/verifyotp', (req, res) =>{
  verifyOtpHelper(req.body, (err, response) => {
        if (err) {
          res.send({ status: 'failed', message: err?.message })
        } else {
          res.send({ status: 'success', data: response })
        }
      })
})


userRouter.post('/signup', (req,res) =>{
  signupHelper(req.body, (err, response) => {
    if (err) {
      res.send({ status: 'failed', message: err?.message })
    } else {
      res.send({ status: 'success', data: response })
    }
  })
})

userRouter.post('/login', (req,res) =>{
    let otp = Math.floor(10000 + Math.random() * 90000)
})



module.exports = userRouter