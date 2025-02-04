const mongoose = require("mongoose");

const userinfo = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    otpCreatedAt: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model("userInfo", userinfo);

// Function to clear OTP after 5 minutes
// const clearOTP = async () => {
//     setInterval(async () => {
//         await user.updateMany(
//             { otpCreatedAt: { $lte: new Date(Date.now() - 5 * 60 * 1000) } }, 
//             { $unset: { otp: 1, otpCreatedAt: 1 } }
//         );
//     }, 60000); // Runs every 1 minute
// };

// clearOTP(); // Start the OTP clearing process

module.exports = user;
