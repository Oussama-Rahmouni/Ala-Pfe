import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

import connect from './config/db.js';
import appRoutes from './routes/app.route.js';
import coreRoutes from './routes/core.route.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


const currentUrl = import.meta.url;
const currentPath = fileURLToPath(currentUrl);
const currentDir = path.dirname(currentPath);

app.use('/Assets', express.static(path.join(currentDir, 'Assets')));

app.use(appRoutes);
app.use(coreRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT , ()=>{
    connect()
    console.log(`server is running on port ${PORT} !!!`)
})