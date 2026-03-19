const taskService = require("../services/taskService")
const tagService = require("../services/tagService")
const commentService = require("../services/commentService")
const userService = require("../services/userService")

const getTasks = (req, res) => {
  res.json(taskService.getTasks(req.query.search, req.query.sort))
}

const createTask = (req, res) => {
  try {
    const task = taskService.createTask(
      req.body.titulo,
      req.body.categoria,
      req.body.responsavelNome
    )
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateTask = (req, res) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body)
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteTask = (req, res) => {
  try {
    const result = taskService.deleteTask(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getStats = (req, res) => {
  res.json(taskService.getTaskStats())
}

const addTagToTask = (req, res) => {
  try {
    const result = taskService.addTagToTask(
      req.params.id,
      req.body.tagId,
      tagService
    )
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const createComment = (req, res) => {
  try {
    const comment = commentService.createComment(
      req.params.id,
      req.body.userId,
      req.body.conteudo,
      taskService,
      userService
    )
    res.status(201).json(comment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getComments = (req, res) => {
  res.json(commentService.getCommentsByTask(req.params.id))
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  addTagToTask,
  createComment,
  getComments
}