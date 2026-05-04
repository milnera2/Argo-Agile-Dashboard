import express from "express";
import ViteExpress from "vite-express";
import createConnection from "./db.js"
const app = express();

createConnection();

app.get('/api', (req, res) => {
    res.send('Hello World!');
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));