import express from "express";
import ViteExpress from "vite-express";
import createConnection from "./db.js"

import router from "./routes/router.js";
import {PORTNUM} from "./Configs/configs.js"
createConnection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const loggerMiddleware = function (req, res, next) {
    console.log(`${req.path} - ${req.method} - IP ${req.ip} - payload ${JSON.stringify(req.body)} - timestamp ${Date.now()}`);
    next();
}
app.use(loggerMiddleware);
app.use('/api', router)

ViteExpress.listen(app, PORTNUM, () => console.log("Server is listening..."));