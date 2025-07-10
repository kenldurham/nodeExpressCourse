const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  // Use mock user creation since database is not available
  const mockUser = {
    name: req.body.name || 'Demo User',
    email: req.body.email || 'demo@example.com',
    createJWT: () => 'demo-jwt-token-12345'
  }
  const token = mockUser.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: mockUser.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  
  // Use mock login since database is not available
  const mockUser = {
    name: 'Demo User',
    email: email,
    createJWT: () => 'demo-jwt-token-12345'
  }
  const token = mockUser.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: mockUser.name }, token })
}

module.exports = {
  register,
  login,
}
