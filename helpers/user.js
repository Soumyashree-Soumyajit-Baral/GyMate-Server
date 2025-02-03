const async = require('async')
const User = require('../persistence/user')

module.exports = (incoming, callback) => {
  let clienterr, mobile, otp

  function validatedata(_callback) {
    if (!incoming || (!incoming.mobile || `${incoming.mobile}`.trim().length > 20 || !`${incoming.mobile}`.trim()))
      clienterr = "Invalid Mobile No."
    _callback(clienterr)
  }

  function getotp(_callback) {
    User.setotp(incoming, (err, _user) => {
      if (err) {
        clienterr = "Error getting OTP"
      } else if (!_user) clienterr = `No user prese nt with mobile no. ${incoming.mobile}.`
      else {
        otp = _user.otp
        if (_user.status !== "active") clienterr = "Sorry! The user is not active"
      }
      _callback(clienterr)
    })
  }

  function sendotp(_callback) {
    console.log("otp send")
  }

  async.waterfall([validatedata, getotp, sendotp], () => {
    let channelerr
    if (clienterr) channelerr = new Error(clienterr)
    callback(channelerr, { msg: 'OTP sent successfully.' })
  })
}
