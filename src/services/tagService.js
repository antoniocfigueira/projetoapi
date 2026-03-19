let tags = []

const getTags = () => {
  return tags
}

const createTag = (nome) => {
  if (!nome || nome.trim() === "") {
    throw new Error("Nome da tag obrigatório")
  }

  const newTag = {
    id: tags.length + 1,
    nome
  }

  tags.push(newTag)
  return newTag
}

const deleteTag = (id, taskService) => {
  const tag = tags.find(t => t.id === Number(id))
  if (!tag) throw new Error("Tag não encontrada")

  tags = tags.filter(t => t.id !== Number(id))
  taskService.removeTagAssociations(Number(id))

  return { message: "Tag removida" }
}

const getTagById = (id) => {
  return tags.find(t => t.id === Number(id))
}

module.exports = {
  getTags,
  createTag,
  deleteTag,
  getTagById
}