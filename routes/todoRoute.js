
const router = require("express").Router();
const TodoController = require("../controller/todoController");

router.get("/task/:id", TodoController.getTask);
router.get("/tasks", TodoController.getAllTask);
router.post("/create", TodoController.createTask);
router.put("/update/:id", TodoController.updateTask);
router.delete("/delete/:id", TodoController.deleteTask);

module.exports = router;