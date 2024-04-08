import Trainer from '../models/trainerModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Course from '../models/courseModel.js';

class TrainerController {

  // Register a new trainer
  static async register(req, res) {
    const { name, email, password, expertise } = req.body;
    try {
      const existingTrainer = await Trainer.findOne({ email });
      if (existingTrainer) {
        return res.status(409).json({ message: 'Trainer already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const trainer = new Trainer({ name, email, password: hashedPassword, expertise });
      await trainer.save();

      const token = jwt.sign({ email: trainer.email, id: trainer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ trainer, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong during registration.' });
    }
  }

  // Trainer login
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const trainer = await Trainer.findOne({ email });
      if (!trainer) {
        return res.status(404).json({ message: 'Trainer not found.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, trainer.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign({ email: trainer.email, id: trainer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ trainer, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong during login.' });
    }
  }

  // Update trainer profile
  static async updateProfile(req, res) {
    const { id } = req.params;
    const { name, expertise } = req.body;
    try {
      const updatedTrainer = await Trainer.findByIdAndUpdate(id, { name, expertise }, { new: true });
      res.status(200).json(updatedTrainer);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong while updating the profile.' });
    }
  }

  // List courses taught by the trainer
  static async listCourses(req, res) {
    const { id } = req.params;
    try {
      const courses = await Course.find({ trainer: id });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to list courses.' });
    }
  }

  // Add a course (assuming trainer has the right to create a course directly)
  static async addCourse(req, res) {
    const { id } = req.params; // Trainer's ID
    const { title, description, startDate, endDate, category } = req.body;
    try {
      const newCourse = new Course({
        title,
        description,
        startDate,
        endDate,
        trainer: id,
        category
      });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add a new course.' });
    }
  }
  
  // Additional methods for updating and deleting courses, etc., can be implemented similarly.

}

export default TrainerController;
