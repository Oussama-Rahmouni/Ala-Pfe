import Learner from '../models/learnerModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../../utils/emailHelper.js' 
import Request from '../models/requestModel.js';
import { generateRefreshToken, generateToken } from '../../utils/tokenHelper.js';
class LearnerController {
  
   // Method to handle pre-registration demands by students
   static async demandInscription(req, res) {
    const { name, surname, phoneNumber, email } = req.body;
    const mailOptions = {
      from: 'oussama.rahmouni.manager@gmail.com',  // Email from which the message is sent
      to: 'oussama.rahmouni.manager@gmail.com',          // Admin's email to receive requests
      subject: 'New Student Registration Request',
      text: `Registration request from ${name} ${surname}, Email: ${email}, Phone: ${phoneNumber}`,
    };
  
    const { success, result, error } = await sendEmail(mailOptions);
    if (!success) {
      return res.status(500).json({ message: 'Failed to send email', error });
    } else {
      try {
        const newRequest = new Request({ name, surname, email, phoneNumber });
        await newRequest.save();
        return res.status(200).json({ message: 'Demand sent successfully', info: result.response });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }
  }
  
  // Register a new learner
  static async register(req, res) {
    const { name, email, password, interests } = req.body;
    try {
      // Check if the learner's registration request has been approved
      const approvedRequest = await Request.findOne({ email, status: 'approved' });
      if (!approvedRequest) {
        return res.status(403).json({ message: 'Your registration request has not been approved by the admin.' });
      }

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
      const token = generateToken(learner);
      const refreshToken = generateRefreshToken(learner);
      res.cookie('accessToken', token, { httpOnly: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' });

      res.status(201).json({ learner, token, refreshToken });
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

      // Generate JWT token
      const token = generateToken(learner);
      const refreshToken = generateRefreshToken(learner);
      res.cookie('accessToken', token, { httpOnly: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' });

      res.status(200).json({ learner, token, refreshToken });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }

  static async logout(req, res){

      // Clear the authentication cookies
      res.cookie('accessToken', '', { expires: new Date(0) });
      res.cookie('refreshToken', '', { expires: new Date(0) });
    
      res.status(200).send({ message: 'Logged out successfully' });
  }
  
  // Update learner profile
  static async updateProfile(req, res) {
    try {
    const { id } = req.user;
    const { name, interests, password, email } = req.body;
    let updateData = {};
    if (name) updateData.name = name;
    if (interests) updateData.interests = interests;
    if (password) updateData.password = password;
    if (email) updateData.email = email;

    const updatedLearner = await Learner.findByIdAndUpdate(id, updateData, { new: true });
    
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
