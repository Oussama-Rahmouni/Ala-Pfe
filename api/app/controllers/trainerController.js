import trainerSchema from '../models/trainerModel.js'
import bcrypt from 'bcrypt';
import { generateRefreshToken, generateToken } from '../../utils/tokenHelper.js';
class TrainerController {
  
  // Register a new learner
  static async register(req, res) {
    const { name, email, password, phone, expertise } = req.body;
    try {
      // Check if the learner already exists
      const existingTrainer = await trainerSchema.findOne({ email });
      if (existingTrainer) {
        return res.status(409).send('trainerSchema already exists.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new learner
      const Trainer = new trainerSchema({
        name,
        email,
        password: hashedPassword,
        phone,
        expertise,
      });
      await Trainer.save();

      // Generate JWT token
      const token = generateToken(Trainer);
      const refreshToken = generateRefreshToken(Trainer);
      res.cookie('accessToken', token, { httpOnly: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' });

      res.status(201).json({ Trainer, token, refreshToken });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  }

  // Trainer login
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

}

export default TrainerController;
