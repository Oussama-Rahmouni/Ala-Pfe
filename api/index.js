import express from 'express';
import dotenv from 'dotenv';

import connect from './config/db.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT , ()=>{
    connect()
    console.log(`server is running on port ${PORT} !!!`)
})