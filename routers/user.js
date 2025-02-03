require("dotenv").config();
const express = require('express')
const userHelper = require("../helpers/user")
const userrouter = express.Router()



userrouter.get('/getotp', (req, res) =>{
    let incoming = req.body
    req.body.otp = Math.floor(10000 + Math.random() * 90000)
    userHelper(req.body, (err, response) => {
        if (err) {
          res.send({ status: 'failed', message: err?.message })
        } else {
          res.send({ status: 'success', data: response })
        }
      })
})


userrouter.get('/signup', (req,res) =>{
    let otp = Math.floor(10000 + Math.random() * 90000)
})

userrouter.get('/login', (req,res) =>{
    let otp = Math.floor(10000 + Math.random() * 90000)
})


module.exports = userrouter