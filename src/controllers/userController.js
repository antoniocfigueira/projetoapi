const userService = require("../services/userService")

const getUsers = (req, res) => {
  res.json(userService.getUsers(req.query.search, req.query.sort))
}

const createUser = (req, res) => {
  try {
    const user = userService.createUser(req.body.nome, req.body.email)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateUser = (req, res) => {
  try {
    const user = userService.updateUser(req.params.id, req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const toggleUser = (req, res) => {
  try {
    const user = userService.toggleUser(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteUser = (req, res) => {
  try {
    const result = userService.deleteUser(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getStats = (req, res) => {
  res.json(userService.getUserStats())
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  toggleUser,
  deleteUser,
  getStats
}