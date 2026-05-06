import taskController from '../Controllers/task.controller.js'
import userController from '../Controllers/user.controller.js'
import AuthModule from '../Modules/auth.module.js'
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const router = express.Router();

router.post("/tasks", AuthModule.verifyToken, AuthModule.verifyLogin, taskController.post_task)

router.post("/register", userController.register)

router.post("/login", userController.login)

router.post("/logout", AuthModule.verifyToken, AuthModule.verifyLogin, userController.logout)

router.get("/tasks", AuthModule.verifyToken, AuthModule.verifyLogin, taskController.get_tasks)

router.put("/tasks/:id", AuthModule.verifyToken, AuthModule.verifyLogin, taskController.edit_task)

router.put("/users/:id", AuthModule.verifyToken, AuthModule.verifyLogin, userController.edit_user)

router.delete("/tasks/:id", AuthModule.verifyToken, AuthModule.verifyLogin, taskController.delete_task)

router.delete("/users/:id", AuthModule.verifyToken, AuthModule.verifyLogin, userController.delete_user)

router.get("/user", AuthModule.verifyToken, AuthModule.verifyLogin, userController.get_user)

router.get("/tasks/:id", AuthModule.verifyToken, AuthModule.verifyLogin, taskController.get_task)


export default router;