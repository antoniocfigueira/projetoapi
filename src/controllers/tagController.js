const tagService = require("../services/tagService")
const taskService = require("../services/taskService")

const getTags = (req, res) => {
  res.json(tagService.getTags())
}

const createTag = (req, res) => {
  try {
    const tag = tagService.createTag(req.body.nome)
    res.status(201).json(tag)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteTag = (req, res) => {
  try {
    const result = tagService.deleteTag(req.params.id, taskService)
    res.json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getTasksByTag = (req, res) => {
  res.json(taskService.getTasksByTag(req.params.id))
}

module.exports = {
  getTags,
  createTag,
  deleteTag,
  getTasksByTag
}