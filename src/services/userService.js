let users = []

const getUsers = (search, sort) => {
  let result = [...users] // copia array

  if (search) {
    result = result.filter(u =>
      u.nome.toLowerCase().includes(search.toLowerCase()) // filtro por nome
    )
  }

  if (sort === "asc") {
    result.sort((a, b) => a.nome.localeCompare(b.nome)) // ordem asc
  } else if (sort === "desc") {
    result.sort((a, b) => b.nome.localeCompare(a.nome)) // ordem desc
  }

  return result
}

const createUser = (nome, email) => {
  if (!nome) throw new Error("Nome obrigatório")
  if (!email || !email.includes("@")) throw new Error("Email inválido")

  const newUser = {
    id: users.length + 1,
    nome,
    email,
    ativo: true // utilizador ativo por defeito
  }

  users.push(newUser) // adiciona utilizador
  return newUser
}

const updateUser = (id, data) => {
  const user = users.find(u => u.id === Number(id)) // encontra utilizador
  if (!user) throw new Error("Utilizador não encontrado")

  if (data.nome !== undefined) user.nome = data.nome

  if (data.email !== undefined) {
    if (!data.email.includes("@")) throw new Error("Email inválido")
    user.email = data.email
  }

  if (data.ativo !== undefined) {
    if (typeof data.ativo !== "boolean") throw new Error("ativo deve ser boolean")
    user.ativo = data.ativo // atualiza estado
  }

  return user
}

const toggleUser = (id) => {
  const user = users.find(u => u.id === Number(id)) // encontra utilizador
  if (!user) throw new Error("Utilizador não encontrado")

  user.ativo = !user.ativo // alterna estado
  return user
}

const deleteUser = (id) => {
  const user = users.find(u => u.id === Number(id)) // encontra utilizador
  if (!user) throw new Error("Utilizador não encontrado")

  users = users.filter(u => u.id !== Number(id)) // remove utilizador
  return { message: "Utilizador removido" }
}

const getUserStats = () => {
  const total = users.length
  const ativos = users.filter(u => u.ativo).length

  return {
    total,
    ativos,
    percentagem: total === 0 ? 0 : (ativos / total) * 100 // percentagem ativos
  }
}

module.exports = {
  users,
  getUsers,
  createUser,
  updateUser,
  toggleUser,
  deleteUser,
  getUserStats
}