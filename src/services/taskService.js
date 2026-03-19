let tasks = []
let taskTags = []

const getTasks = (search, sort) => {
  let result = [...tasks]

  if (search) {
    result = result.filter(t =>
      t.titulo.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (sort === "asc") {
    result.sort((a, b) => a.titulo.localeCompare(b.titulo))
  } else if (sort === "desc") {
    result.sort((a, b) => b.titulo.localeCompare(a.titulo))
  }

  return result
}

const createTask = (titulo, categoria, responsavelNome) => {
  if (!titulo || titulo.length < 3) throw new Error("Título inválido")
  if (!responsavelNome) throw new Error("Responsável obrigatório")

  const newTask = {
    id: tasks.length + 1,
    titulo,
    categoria,
    responsavelNome,
    concluida: false,
    dataConclusao: undefined
  }

  tasks.push(newTask)
  return newTask
}

const updateTask = (id, data) => {
  const task = tasks.find(t => t.id === Number(id))
  if (!task) throw new Error("Tarefa não encontrada")

  if (data.titulo !== undefined) task.titulo = data.titulo
  if (data.categoria !== undefined) task.categoria = data.categoria
  if (data.responsavelNome !== undefined)
    task.responsavelNome = data.responsavelNome

  if (data.concluida !== undefined) {
    task.concluida = data.concluida
    task.dataConclusao = data.concluida ? new Date() : undefined
  }

  return task
}

const deleteTask = (id) => {
  const task = tasks.find(t => t.id === Number(id))
  if (!task) throw new Error("Tarefa não encontrada")

  tasks = tasks.filter(t => t.id !== Number(id))
  return { message: "Tarefa removida" }
}

const getTaskStats = () => {
  const total = tasks.length
  const concluidas = tasks.filter(t => t.concluida).length
  const pendentes = total - concluidas

  return { total, pendentes, concluidas }
}

const addTagToTask = (taskId, tagId, tagService) => {
  const task = tasks.find(t => t.id === Number(taskId))
  if (!task) throw new Error("Tarefa não encontrada")

  const tag = tagService.getTagById(tagId)
  if (!tag) throw new Error("Tag não encontrada")

  const exists = taskTags.find(
    tt => tt.taskId === Number(taskId) && tt.tagId === Number(tagId)
  )
  if (exists) throw new Error("Tag já associada")

  const relation = { taskId: Number(taskId), tagId: Number(tagId) }
  taskTags.push(relation)

  return relation
}

const getTasksByTag = (tagId) => {
  const relations = taskTags.filter(tt => tt.tagId === Number(tagId))
  return relations.map(r => tasks.find(t => t.id === r.taskId))
}

const removeTagAssociations = (tagId) => {
  taskTags = taskTags.filter(tt => tt.tagId !== Number(tagId))
}

module.exports = {
  tasks,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  addTagToTask,
  getTasksByTag,
  removeTagAssociations
}