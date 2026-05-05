import taskController from '../Controllers/task.controller.js'
import userController from '../Controllers/user.controller.js'
import express from 'express';

const router = express.Router();

router.post("/tasks", taskController.post_task)

router.post("/register", userController.register)



export default router;