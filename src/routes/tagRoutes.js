const express = require("express")
const router = express.Router()
const controller = require("../controllers/tagController")

router.get("/", controller.getTags)
router.post("/", controller.createTag)
router.delete("/:id", controller.deleteTag)
router.get("/:id/tasks", controller.getTasksByTag)

module.exports = router