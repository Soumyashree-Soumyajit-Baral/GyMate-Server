const async = require("async");
const userModal = require("../models/user");

class Otp {
  getotp(incoming, callback) {
    userModal
      .findOne({ mobile: incoming.mobile })
      .then((user) => {
        if (user) {
          callback(null, user.otp); // Return the OTP if user exists
        } else {
          callback("User not found", null);
        }
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  verifyotp(incoming, callback) {
    userModal
      .findOne({ mobile: incoming.mobile })
      .then((user) => {
        if (user.otp === incoming.otp) {
          callback(null, user); // Return the OTP if user exists
        } else {
          callback("OTP did not match.", null);
        }
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  setotp(incoming, callback) {
    userModal
      .findOneAndUpdate(
        { mobile: incoming.mobile }, // Find user by mobile
        { $set: { otp: incoming.otp } }, // Update OTP field
        { new: true, upsert: false } // Return updated document, do not create new
      )
      .then((user) => {
        if (user) {
          callback(null, user); // Return the OTP if user exists
        } else {
          callback("User not found", null);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

module.exports = new Otp();
