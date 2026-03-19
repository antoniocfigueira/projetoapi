const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")

router.get("/", controller.getUsers)
router.post("/", controller.createUser)
router.put("/:id", controller.updateUser)
router.patch("/:id", controller.toggleUser)
router.delete("/:id", controller.deleteUser)
router.get("/stats", controller.getStats)

module.exports = router