const async = require("async");
const jwt = require("jsonwebtoken")
const Otp = require("../persistence/otp");

module.exports = (incoming, callback) => {
  let clienterr, authToken, user;

  function validatedata(_callback) {
    if (
      !incoming ||
      !incoming.otp ||
      `${incoming.otp}`.trim().length > 5 ||
      !`${incoming.otp}`.trim()
    )
      clienterr = "Invalid OTP.";
    _callback(clienterr);
  }

  function verify(_callback) {
    Otp.verifyotp(incoming, (err, _user) => {
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

  async.waterfall([validatedata, verify, createtoken], () => {
    let channelerr;
    if (clienterr) channelerr = new Error(clienterr);
    callback(channelerr, { authToken });
  });
};
