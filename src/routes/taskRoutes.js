const express = require("express")
const router = express.Router()
const controller = require("../controllers/taskController")

router.get("/", controller.getTasks)
router.post("/", controller.createTask)
router.put("/:id", controller.updateTask)
router.delete("/:id", controller.deleteTask)
router.get("/stats", controller.getStats)

router.post("/:id/tags", controller.addTagToTask)

router.post("/:id/comments", controller.createComment)
router.get("/:id/comments", controller.getComments)

module.exports = router