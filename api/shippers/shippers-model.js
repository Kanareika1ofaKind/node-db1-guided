const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  const shippers = await db('shippers')
  return shippers.map(shipper => ({
    ...shipper,
    phone: shipper.phone ? shipper.phone : null,
  }))
}

async function getById(shipperId) {
  const shipper = await db('shippers').where('shipperId', shipperId).first()
  if (!shipper) {
    return null
  }
  return {
    ...shipper,
    phone: shipper.phone ? shipper.phone : null,
  }
}

async function create(newShipper) {
  const [shipperId] = await db('shippers').insert(newShipper)
  return getById(shipperId)
}

async function update(shipperId, changes) {
  const shipper = await getById(shipperId)
  await db('shippers').where('shipperId', shipperId).update(changes)
  return getById(shipperId)
}

async function remove(shipperId) {
  const shipper = await getById(shipperId)
  await db('shippers').where('shipperId', shipperId).del()
  return shipper
}