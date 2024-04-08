import express from 'express';
const router = express.Router();

// Import controllers
import LearnerController from '../app/controllers/learnerController.js';
import TrainerController from '../app/controllers/trainerController.js';
import CourseController from '../app/controllers/courseController.js';
import ReviewController from '../app/controllers/reviewController.js';
import CategoryController from '../app/controllers/categoryController.js';
import EnrollmentController from '../app/controllers/enrollmentController.js';
import NotificationController from '../app/controllers/notificationController.js';
import CertificateController from '../app/controllers/certificateController.js';

// Middleware
import { authenticate, authorize } from '../middleware/authMiddleware.js';

// Learner Routes
router.post('/learners/register', LearnerController.register);
router.post('/learners/login', LearnerController.login);
router.put('/learners/:id', authenticate, LearnerController.updateProfile);
// More learner routes...

// Trainer Routes
router.post('/trainers/register', TrainerController.register);
router.post('/trainers/login', TrainerController.login);
router.put('/trainers/:id', authenticate, TrainerController.updateProfile);
// More trainer routes...

// Course Routes
router.post('/courses', authenticate, authorize(['trainer', 'admin']), CourseController.createCourse);
router.get('/courses', CourseController.listAllCourses);
// More course routes...

// Additional routes for reviews, categories, enrollments, notifications, certificates...

export default router;
