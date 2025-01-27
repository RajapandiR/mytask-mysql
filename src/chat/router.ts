import express from 'express';
import { Controller } from './controller';
import multer from 'multer';

const app = express.Router();

const upload = multer({ dest: "upload/" })

app.get("/", (req, res) => {
    Controller.getChats(req, res);
})

app.post("/", upload.single("file"), (req, res) => {
    Controller.importData(req, res);
})

export const ChatRouter = app;