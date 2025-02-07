const async = require('async')
const User = require('../persistence/user')
const Otp = require("../persistence/otp");
const jwt = require("jsonwebtoken")

module.exports = (incoming, callback) => {
  let clienterr, authToken, user

  function validatedata(_callback) {
    if (!incoming || (!incoming.mobile || `${incoming.mobile}`.trim().length > 20 || !`${incoming.mobile}`.trim()))
      clienterr = "Invalid Mobile No."
    _callback(clienterr)
  }

  function checkuser(_callback) {
      User.get(incoming, (err, _user) => {
        if (err) {
          clienterr = "Error Getting User";
        } else if (!_user) {
          clienterr = "User does not exist";
        }
        _callback(clienterr);
      });
    }

  function verifyotp(_callback) {
    Otp.verifyotp(incoming, (err, _user) => {
      console.log(err)
          if (err) {
            clienterr = "Error getting OTP";
          } else if (!_user)
            clienterr = `No user present with mobile no. ${incoming.mobile}.`;
          else {
            user = _user;
            // if (_user.status !== "active")
            //   clienterr = "Sorry! The user is not active";
          }
          _callback(clienterr);
        });
  }

  function createtoken(_callback) {
      authToken = jwt.sign(user.mobile, process.env.SECRET_KEY);
      _callback(clienterr)
    }

  async.waterfall([validatedata, checkuser, verifyotp, createtoken], () => {
    let channelerr
    if (clienterr) channelerr = new Error(clienterr)
    callback(channelerr, {authToken})
  })
}
