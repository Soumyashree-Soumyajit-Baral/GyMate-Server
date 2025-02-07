const async = require("async");
const userModal = require("../models/user");

class User {
  get(incoming, callback) {
    userModal
      .findOne({ mobile: incoming.mobile })
      .then((user) => {
        console.log(user)
        if (user) {
          callback(null, user); // Return the OTP if user exists
        } else {
          callback(null, null);
        }
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  create(incoming, callback) {
    userModal
      .create({ mobile: incoming.mobile})
      .then((user) => {
          callback(null, user);
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
          callback(null, user.otp); // Return the OTP if user exists
        } else {
          callback("User not found", null);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

module.exports = new User();
