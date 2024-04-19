import express from 'express';
const router = express.Router();

// Import core controllers
import AuthController from '../core/controllers/authController.js';
import AdministrationController from '../core/controllers/adminController.js';

// Middleware
import {authenticate, authorize} from '../middlewares/authMiddleware.js';

// Admin Authentification
router.post('/admin/register', AuthController.registerAdmin);
router.post('/admin/login', AuthController.loginAdmin);
router.post('/admin/logout', AuthController.logout);


//admin functions for learner requests
router.get('/admin/requests', authenticate, authorize(['admin']), AdministrationController.listRequests);
router.patch('/admin/approuve/:id', authenticate, authorize(['admin']), AdministrationController.approuveRequest);
router.patch('/admin/reject/:id', authenticate, authorize(['admin']), AdministrationController.rejectRequest);
// router.get('/admin/users', authenticate, authorize(['admin']), AdministrationController.listUsers);




export default router;
