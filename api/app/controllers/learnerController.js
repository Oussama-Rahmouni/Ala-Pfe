import Learner from '../models/learnerModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LearnerController {
  
  // Register a new learner
  static async register(req, res) {
    const { name, email, password, interests } = req.body;
    try {
      // Check if the learner already exists
      const existingLearner = await Learner.findOne({ email });
      if (existingLearner) {
        return res.status(409).send('Learner already exists.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new learner
      const learner = new Learner({
        name,
        email,
        password: hashedPassword,
        interests
      });
      await learner.save();

      // Generate JWT token
      const token = jwt.sign({ email: learner.email, id: learner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ learner, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }

  // Learner login
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const learner = await Learner.findOne({ email });
      if (!learner) {
        return res.status(404).send('Learner not found.');
      }

      const isPasswordCorrect = await bcrypt.compare(password, learner.password);
      if (!isPasswordCorrect) {
        return res.status(400).send('Invalid credentials.');
      }

      const token = jwt.sign({ email: learner.email, id: learner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ learner, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }

  // Update learner profile
  static async updateProfile(req, res) {
    const { id } = req.params;
    const { name, interests } = req.body;
    try {
      const updatedLearner = await Learner.findByIdAndUpdate(id, { name, interests }, { new: true });
      res.status(200).json(updatedLearner);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }

  // List learner's enrolled courses (Example function)
  static async listCourses(req, res) {
    const { id } = req.params;
    try {
      const learner = await Learner.findById(id).populate('enrolledCourses');
      res.status(200).json(learner.enrolledCourses);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
  
  // Additional methods like viewing completed courses, enrolling in a course, etc., can be added here.
}

export default LearnerController;
