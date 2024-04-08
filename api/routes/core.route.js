import express from 'express';
const router = express.Router();

// Import core controllers
import UserController from '../core/controllers/userController.js';
import AuthController from '../core/controllers/authController.js';
import AdministrationController from '../core/controllers/administrationController.js';

// Middleware
import { authenticate, authorize } from '../middleware/authMiddleware.js';

// User (Administration) Routes
router.post('/admin/register', AuthController.registerAdmin);
router.post('/admin/login', AuthController.loginAdmin);
router.get('/admin/users', authenticate, authorize(['admin']), AdministrationController.listUsers);
// More administration routes...

// Authentication Routes
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
