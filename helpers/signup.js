const async = require("async");
const Otp = require("../persistence/otp");
const User = require("../persistence/user");

module.exports = (incoming, callback) => {
  let clienterr;

  function validatedata(_callback) {
    if (!incoming || !incoming.mobile || `${incoming.mobile}`.trim().length > 20 || !`${incoming.mobile}`.trim())
      clienterr = "Invalid Mobile No.";
    _callback(clienterr);
  }

  function getuser(_callback) {
    User.get(incoming, (err, _user) => {
      if (err) {
        console.log(err)
        clienterr = "Error Getting User";
      } else if (_user) {
        clienterr = "User already exist";
      }
      _callback(clienterr);
    });
  }

  function createuser(_callback) {
    User.create(incoming, (err, user) => {
      if (err) {
        clienterr = "Error while creating user";
      } else if(!user){
        clienterr = "Internal Error! Could not create the user."
      }
      _callback(clienterr);
    });
  }

  async.waterfall([validatedata, getuser, createuser], () => {
    let channelerr;
    if (clienterr) channelerr = new Error(clienterr);
    callback(channelerr, { msg: "User created successfully." });
  });
};
