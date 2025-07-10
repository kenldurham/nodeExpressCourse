const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide agent name'],
      maxlength: 50,
    },
    type: {
      type: String,
      required: [true, 'Please provide agent type'],
      maxlength: 100,
      default: 'GitHub Copilot Agent',
    },
    status: {
      type: String,
      enum: ['running', 'stopped', 'error', 'pending'],
      default: 'pending',
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    health: {
      type: String,
      enum: ['healthy', 'warning', 'critical'],
      default: 'healthy',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Agent', AgentSchema)