const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (incoming, callback) => {
  client.messages
    .create({
      body: incoming.body,
      to: incoming.to,
      from : process.env.TWILIO_MOBILE_NO
    })
    .then(message => callback(null, {messageID: message.sid}))
    .catch(error => {
      console.log(error)
      callback(error, null)

    });
}