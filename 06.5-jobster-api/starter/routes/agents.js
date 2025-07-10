const express = require('express')

const router = express.Router()
const {
  createAgent,
  deleteAgent,
  getAllAgents,
  updateAgent,
  getAgent,
} = require('../controllers/agents')

router.route('/').post(createAgent).get(getAllAgents)

router.route('/:id').get(getAgent).delete(deleteAgent).patch(updateAgent)

module.exports = router