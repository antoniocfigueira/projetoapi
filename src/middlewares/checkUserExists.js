const { users } = require("../services/userService")

const checkUserExists = (req, res, next) => {
  const user = users.find(u => u.id === Number(req.params.id))

  if (!user) {
    return res.status(404).json({ error: "Utilizador não encontrado" })
  }

  req.user = user
  next()
}

module.exports = checkUserExists