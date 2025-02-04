const async = require('async')
const Customers = require('../persistence/customers')
const log = require('../sys/log')

module.exports = (incoming, context, callback) => {
  let clienterr, syserr, customerid

  function validatedata(_callback) {
    if (!incoming || (!incoming.mobile || `${incoming.mobile}`.trim().length > 20 || !`${incoming.mobile}`.trim()))
      clienterr = process.env.ERR_ACTIVATE_MOBILE
    _callback(clienterr)
  }

  function getcustomer(_callback) {
    Customers.getbymobile(incoming.mobile, (err, _customer) => {
      if (err) {
        clienterr = process.env.ERR_CUSTOMER
        syserr = err
      } else if (!_customer) clienterr = `${process.env.ERR_NO_CUSTOMER} ${incoming.mobile}.`
      else {
        customerid = _customer.id
        if (_customer.status === process.env.ACCOUNT_ACTIVE) clienterr = process.env.ERR_ACTIVATE_ACTIVE
      }
      _callback(clienterr)
    })
  }

  function activate(_callback) {
    Customers.activate(customerid, incoming.comment, err => {
      if (err) {
        clienterr = `${process.env.ERR_ACTIVATE_FAILED} ${incoming.mobile}.`
        syserr = err
      }
      _callback(clienterr)
    })
  }

  async.waterfall([validatedata, getcustomer, activate], () => {
    let channelerr
    if (syserr) log(`Activate user err ${JSON.stringify(syserr)}`, true)
    if (clienterr) channelerr = new Error(clienterr)
    callback(channelerr, { msg: 'Customer activated successfully.' })
  })
}
