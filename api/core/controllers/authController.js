import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import administrationModel from '../models/administrationModel.js';

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
  
  static async logout(req, res) {
    // Clear the authentication cookies
    res.cookie('accessToken', '', { expires: new Date(0) });
    res.cookie('refreshToken', '', { expires: new Date(0) });
  
    res.status(200).send({ message: 'Logged out successfully' });
   }
   
  }

export default AuthController;
