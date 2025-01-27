import express from 'express';
import 'dotenv/config';
const app = express();
import cors from 'cors';
import { AuthRouter, ChatRouter } from './src/helpers/paths';
import { Middleware } from './src/middleware/middleware';
app.use(express.json());
app.use(cors())
const port = process.env.PORT;


app.use('/api/auth', AuthRouter);
app.use('/api/chat', Middleware.authMiddleware, ChatRouter)
app.listen(port, () => {
    console.log(`Server on ${port}`);
})