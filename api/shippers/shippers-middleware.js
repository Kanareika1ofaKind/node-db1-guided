const db = require('../../data/db-config.js')

module.exports = {
  checkId,
  checkPayload,
}

function checkId(req, res, next) {
  const { id } = req.params
  db('shippers')
    .where({ shipperId: id })
    .first()
    .then(shipper => {
      if (!shipper) {
        next({ status: 404, message: 'Shipper not found' })
      } else {
        next()
      }
    })
    .catch(err => {
      next({ status: 500, message: 'Error checking shipper ID', error: err })
    })

}

function checkPayload(req, res, next) {

  const { phone, shipperName } = req.body
  if (!shipperName || !phone) {
    next({ status: 422, message: 'shipperName and phone are required' })
  }
  else {
    next()
  }
}
