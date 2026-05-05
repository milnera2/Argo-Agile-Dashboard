import taskController from '../Controllers/task.controller.js'
import userController from '../Controllers/user.controller.js'
import AuthModule from '../Modules/auth.module.js'
import {GoogleGenerativeAI}  from "@google/generative-ai"
import {GEMINI_KEY} from "../Configs/configs.js"
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
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

router.post('/ai/consult', async (req, res) => {
    const { messages } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Format the conversation history for Gemini's structure
        const chat = model.startChat({
            history: messages.slice(0, -1).map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }],
            })),
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;

        res.json({
            reply: response.text()
        });
    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).json({ error: "AI Neural Link Failure" });
    }
});


export default router;