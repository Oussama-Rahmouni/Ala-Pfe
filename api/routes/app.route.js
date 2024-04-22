import express from 'express';
const router = express.Router();

// Import controllers
import LearnerController from '../app/controllers/learnerController.js';
import TrainerController from '../app/controllers/trainerController.js';
import CourseController from '../app/controllers/courseController.js';
// import ReviewController from '../app/controllers/reviewController.js';
// import CategoryController from '../app/controllers/categoryController.js';
// import EnrollmentController from '../app/controllers/enrollmentController.js';
// import NotificationController from '../app/controllers/notificationController.js';
// import CertificateController from '../app/controllers/certificateController.js';

// // Middleware
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

//demande d'inscription
router.post('/learner/demand', LearnerController.demandInscription);

// Learner Routes
router.post('/learners/register', LearnerController.register);
router.post('/learners/login', LearnerController.login);
router.post('/learners/logout', LearnerController.logout);
router.put('/learners/update', authenticate, authorize(['learner']), LearnerController.updateProfile)
router.get('/learners', authenticate, authorize(['admin', 'trainer']), LearnerController.getAllLearners)
router.get('/learners/:id', authenticate, authorize(['admin', 'trainer']), LearnerController.getLearner)

// // Trainer Routes
router.post('/trainers/register', TrainerController.register);
router.post('/trainers/login', TrainerController.login);
router.post('/trainers/logout', TrainerController.logout);
router.put('/trainers/update', authenticate, authorize(['trainer']), TrainerController.updateProfile);
router.get('/trainers', authenticate, authorize(['admin']), TrainerController.getAllTrainers);
router.get('/trainers/:id', authenticate, TrainerController.getTrainer);

// // Course Routes
router.post('/courses', authenticate, authorize(['admin']), CourseController.createCourse);
router.get('/courses', CourseController.listAllCourses);
router.put('/courses/:id', authenticate, authorize(['admin']), CourseController.updateCourse);
router.delete('/courses/:id', authenticate, authorize(['admin']), CourseController.deleteCourse);

// // Additional routes for reviews, categories, enrollments, notifications, certificates...

export default router;
