import taskController from '../Controllers/task.controller.js'
import userController from '../Controllers/user.controller.js'
import AuthModule from '../Modules/auth.module.js'
import express from 'express';

const router = express.Router();

router.post("/tasks", AuthModule.verifyToken, taskController.post_task)

router.post("/register", userController.register)

router.post("/login", userController.login)

router.get("/tasks", AuthModule.verifyToken, taskController.get_tasks)

router.put("/tasks/:id", AuthModule.verifyToken, taskController.edit_task)

router.delete("/tasks/:id", AuthModule.verifyToken, taskController.delete_task)

export default router;