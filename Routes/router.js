import controller from '../Controllers/task.controller.js'
import express from 'express';

const router = express.Router();

router.post("/tasks", controller.post_task)

router.get("/test", controller.test)

export default router;