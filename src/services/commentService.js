let comments = []

const createComment = (taskId, userId, conteudo, taskService, userService) => {

  const task = taskService.tasks.find(t => t.id === Number(taskId))
  if (!task) throw new Error("Tarefa não encontrada")

  const user = userService.users.find(u => u.id === Number(userId))
  if (!user) throw new Error("Utilizador não encontrado")

  if (!conteudo || conteudo.trim() === "") {
    throw new Error("Conteúdo obrigatório")
  }

  const newComment = {
    id: comments.length + 1,
    taskId: Number(taskId),
    userId: Number(userId),
    conteudo,
    dataCriacao: new Date()
  }

  comments.push(newComment)

  return newComment
}

const getCommentsByTask = (taskId) => {
  return comments.filter(c => c.taskId === Number(taskId))
}

module.exports = {
  createComment,
  getCommentsByTask
}