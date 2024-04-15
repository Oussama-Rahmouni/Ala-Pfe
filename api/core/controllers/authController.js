import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import administrationModel from '../models/administrationModel.js';
import sendEmail from '../../utils/emailHelper.js';
import {generateToken, generateRefreshToken } from '../../utils/tokenHelper.js'

class AuthController {

  // Register Admin
  static async registerAdmin(req, res) {
    const { email, password, FirstName, LastName } = req.body;
    try {
      const existingAdmin = await administrationModel.findOne({ email, role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newAdmin = await administrationModel.create({
        email,
        password: hashedPassword,
        FirstName:FirstName,
        LastName : LastName,
        role: 'admin'
      });

      const token = generateToken(adminUser);
      const refreshToken = generateRefreshToken(adminUser);
  
      // Set HTTPOnly cookies
      res.cookie('accessToken', token, { httpOnly: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' });
      res.status(201).json({ result: adminUser, token, refreshToken });  // Optionally return tokens in response
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", Error:error.message });
    }
  }

  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const adminUser = await administrationModel.findOne({ email });
  
      if (!adminUser) {
        return res.status(401).json({ message: "No admin with these data is registered" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, adminUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = generateToken(adminUser);
      const refreshToken = generateRefreshToken(adminUser);
  
      // Set HTTPOnly cookies
      res.cookie('accessToken', token, { httpOnly: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' });
  
      res.status(200).json({ result: adminUser, token, refreshToken });  // Optionally return tokens in response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
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
      return res.status(200).json({ message: 'Demand sent successfully', info: result.response });
    }
  }

  // User Login
  static async login(req, res) {
    const { email, password, role } = req.body;
    try {
      const user = await User.findOne({ email, role });
      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ result: user, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Register Trainer (registration process that includes approval mechanism)
  static async registerTrainer(req, res) {
    const { email, password } = req.body;
    try {
      const existingTrainer = await User.findOne({ email, role: 'trainer', isApproved: false });
      if (existingTrainer) {
        return res.status(400).json({ message: "Trainer registration pending approval" });
      }
      
      // Only create account if trainer is approved
      if (!existingTrainer.isApproved) {
        return res.status(403).json({ message: "Trainer not approved by admin yet" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newTrainer = await User.create({
        email,
        password: hashedPassword,
        role: 'trainer',
        isApproved: true // Assuming admin approval
      });

      const token = jwt.sign({ email: newTrainer.email, id: newTrainer._id, role: newTrainer.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(201).json({ newTrainer, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Additional functionalities like logout, password reset, etc., can be implemented similarly.
}

export default AuthController;
