import express from 'express';

import authentifier from './auth.js'

const router = express.Router();

router.post("/auth", authentifier);

export default router;