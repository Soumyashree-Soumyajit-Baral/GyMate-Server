const async = require('async')
const Otp = require('../persistence/otp')
const sendSMS = require("../comms/sms")

module.exports = (incoming, callback) => {
  let clienterr, user, otp

  function validatedata(_callback) {
    if (!incoming || (!incoming.mobile || `${incoming.mobile}`.trim().length > 20 || !`${incoming.mobile}`.trim()))
      clienterr = "Invalid Mobile No."
    _callback(clienterr)
  }

  function getotp(_callback) {
    console.log(incoming)
    Otp.setotp(incoming, (err, _user) => {
      console.log(err)
      if (err) {
        clienterr = "Error getting OTP"
      } else if (!_user) {
        clienterr = `No user present with mobile no. ${incoming.mobile}.`
      }else {
        otp = _user.otp
        user = _user
        // if (_user.status !== "active") clienterr = "Sorry! The user is not active"
      }
      _callback(clienterr)
    })
  }

  function sendotp(_callback) {
    let smsData = {
      body: `Dear customer, Your OTP is ${otp} and valid for 5 minutes. Please do not share it with anyone else`,
      to: `+91${user.mobile}`
    }
    sendSMS(smsData, (err, data) => {
      if(err){
        clienterr = "Error while sending sms"
      } else if(!data){
        clienterr = "Could not send the OTP. Please try again later."
      }
      _callback(clienterr)
    })
  }

  async.waterfall([validatedata, getotp, sendotp], () => {
    let channelerr
    if (clienterr) channelerr = new Error(clienterr)
    callback(channelerr, { msg: 'OTP sent successfully.' })
  })
}
