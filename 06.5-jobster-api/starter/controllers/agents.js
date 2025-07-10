const Agent = require('../models/Agent')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// Mock data for agents when database is not available
const mockAgents = [
  {
    _id: '1',
    name: 'GitHub Copilot Assistant',
    type: 'GitHub Copilot Agent',
    description: 'AI-powered coding assistant helping with code generation and completion',
    status: 'running',
    health: 'healthy',
    lastSeen: new Date(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    createdBy: 'mock-user-id',
  },
  {
    _id: '2',
    name: 'Code Review Bot',
    type: 'Automation Agent',
    description: 'Automated code review and quality analysis agent',
    status: 'running',
    health: 'healthy',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    createdBy: 'mock-user-id',
  },
  {
    _id: '3',
    name: 'ML Model Trainer',
    type: 'ML Model Agent',
    description: 'Machine learning model training and deployment agent',
    status: 'stopped',
    health: 'warning',
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    createdBy: 'mock-user-id',
  },
  {
    _id: '4',
    name: 'API Monitor',
    type: 'API Monitor Agent',
    description: 'Monitors API endpoints and service health',
    status: 'error',
    health: 'critical',
    lastSeen: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
    createdBy: 'mock-user-id',
  },
  {
    _id: '5',
    name: 'Data Processor',
    type: 'Data Processing Agent',
    description: 'Processes and analyzes large datasets',
    status: 'running',
    health: 'healthy',
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000), // 5 days ago
    createdBy: 'mock-user-id',
  },
];

let agentCounter = 6;

const getAllAgents = async (req, res) => {
  try {
    // Try to use database first
    const agents = await Agent.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ agents, count: agents.length })
  } catch (error) {
    // Fall back to mock data if database is not available
    const agents = mockAgents.filter(agent => agent.createdBy === req.user.userId || agent.createdBy === 'mock-user-id');
    res.status(StatusCodes.OK).json({ agents, count: agents.length })
  }
}

const getAgent = async (req, res) => {
  const {
    user: { userId },
    params: { id: agentId },
  } = req

  try {
    const agent = await Agent.findOne({
      _id: agentId,
      createdBy: userId,
    })
    if (!agent) {
      throw new NotFoundError(`No agent with id ${agentId}`)
    }
    res.status(StatusCodes.OK).json({ agent })
  } catch (error) {
    // Fall back to mock data
    const agent = mockAgents.find(a => a._id === agentId && (a.createdBy === userId || a.createdBy === 'mock-user-id'));
    if (!agent) {
      throw new NotFoundError(`No agent with id ${agentId}`)
    }
    res.status(StatusCodes.OK).json({ agent })
  }
}

const createAgent = async (req, res) => {
  req.body.createdBy = req.user.userId
  
  try {
    const agent = await Agent.create(req.body)
    res.status(StatusCodes.CREATED).json({ agent })
  } catch (error) {
    // Fall back to mock data
    const newAgent = {
      _id: agentCounter.toString(),
      ...req.body,
      lastSeen: new Date(),
      createdAt: new Date(),
    };
    mockAgents.push(newAgent);
    agentCounter++;
    res.status(StatusCodes.CREATED).json({ agent: newAgent })
  }
}

const updateAgent = async (req, res) => {
  const {
    body: { name, type },
    user: { userId },
    params: { id: agentId },
  } = req

  if (name === '' || type === '') {
    throw new BadRequestError('Name or Type fields cannot be empty')
  }
  
  // Update lastSeen timestamp when updating agent
  req.body.lastSeen = new Date()
  
  try {
    const agent = await Agent.findByIdAndUpdate(
      { _id: agentId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!agent) {
      throw new NotFoundError(`No agent with id ${agentId}`)
    }
    res.status(StatusCodes.OK).json({ agent })
  } catch (error) {
    // Fall back to mock data
    const agentIndex = mockAgents.findIndex(a => a._id === agentId && (a.createdBy === userId || a.createdBy === 'mock-user-id'));
    if (agentIndex === -1) {
      throw new NotFoundError(`No agent with id ${agentId}`)
    }
    mockAgents[agentIndex] = { ...mockAgents[agentIndex], ...req.body };
    res.status(StatusCodes.OK).json({ agent: mockAgents[agentIndex] })
  }
}

const deleteAgent = async (req, res) => {
  const {
    user: { userId },
    params: { id: agentId },
  } = req

  try {
    const agent = await Agent.findByIdAndRemove({
      _id: agentId,
      createdBy: userId,
    })
    if (!agent) {
      throw new NotFoundError(`No agent with id ${agentId}`)
    }
    res.status(StatusCodes.OK).send()
  } catch (error) {
    // Fall back to mock data
    const agentIndex = mockAgents.findIndex(a => a._id === agentId && (a.createdBy === userId || a.createdBy === 'mock-user-id'));
    if (agentIndex === -1) {
      throw new NotFoundError(`No agent with id ${agentId}`)
    }
    mockAgents.splice(agentIndex, 1);
    res.status(StatusCodes.OK).send()
  }
}

module.exports = {
  createAgent,
  deleteAgent,
  getAllAgents,
  updateAgent,
  getAgent,
}