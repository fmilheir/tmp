import userModel from '../Models/userModel.mjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PERMISSION_LEVELS } from '../public/scripts/permissions.mjs';
import { generateToken }  from "./generateTokenController.mjs";
import { generateVerificationCode } from './generateTokenController.mjs';
import { sendPasswordResetEmail, sendConfirmationEmail } from './emailController.mjs';

dotenv.config();
const EXPIRES_IN = process.env.EXPIRES_IN
const JWT_SECRET = process.env.JWT_SECRET

class userController {
  

  static async getAllUsersController(req, res) {
    try {
      const users = await new userModel().getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async addUserController(req, res) {
    const { username, email, password, permission_level: permissionLevelFromBody } = req.body;
    
    try {
      const userInstance = new userModel();
      const existingUser = await userInstance.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists.' });
      }
      const permission_level = permissionLevelFromBody || PERMISSION_LEVELS.USER; // Use provided level or default
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = generateVerificationCode();
      console.log("Received Verification Code in Controller:", verificationCode);
      
      const verificationExpires = new Date();
      // Set expiry time to 2 hours 
      verificationExpires.setHours(verificationExpires.getHours() + 2);
      const formattedVerificationExpires = verificationExpires.toISOString().slice(0, 19).replace('T', ' ');
      console.log(formattedVerificationExpires); 
      await userInstance.addUser(
        username, 
        email, 
        hashedPassword, 
        permission_level,
        verificationCode,
        formattedVerificationExpires
        );

      // Send email with verification code 
      await sendConfirmationEmail.send(
        email,
        verificationCode,
        username
      );
      res.status(201).json({ message: "User registered. Please check your email to verify account",  verificationCode });
      console.log(verificationCode)
    } catch (err) {
      res.status(500).json({ error: error.message });
    }
  }
    
  static async deleteUserController(req, res) {
    const userId = req.params.userId;
    try {
      const affectedRows = await new userModel().deleteUser(userId);
      if (affectedRows > 0) {
        res.json({ message: 'User deleted successfully.' });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async logout(req, res) {
    // Logout logic here
  }
  static async getUserByUsernameController(req, res) {
    const username = req.params.username;
    try {
      const userInstance = new userModel();
      const user = await userInstance.getUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try {
        const { username, password } = req.body;
        const userInstance = new userModel();

        // Check if the user exists
        const user = await userInstance.getUserByUsername(username);
        if (!user) {
          console.log("User not found in the database");
          return res.status(404).json({ error: 'User not found' });
        }
        
        // Use the validateUserPassword function to compare passwords
        const isValid = await userInstance.validateUserPassword(username, password);
        console.log("This is the username:", username);
        console.log("This is the password:", password);
        if (isValid) {
            // Create token
            console.log(JWT_SECRET);
            console.log(EXPIRES_IN);
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: EXPIRES_IN });
            res.status(200).json({ message: "Login successful!", token, user: { username } });
        } else {
            res.status(401).json({ error: 'Wrong username or password!' });
        }
    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

  

  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const userInstance = new userModel();
      const user = await userInstance.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Email does not exist' });
      } 
      // Generate a token
      const token = generateToken();
      const expiresTimeStamp = Date.now() + 3600000; // 1 hour from now in milliseconds
      const expires = new Date(expiresTimeStamp).toISOString().slice(0, 19).replace('T', ' ');
      console.log(`Generated Token: ${token}, Expires: ${expires}`);
      const saveResult = await userInstance.savePasswordResetToken(user.id, token, expires); 
      console.log(`Token save result: ${saveResult}`);
      // Send a password reset email to the user
      await sendPasswordResetEmail.send(user.email, token, user.username);     
      res.status(200).json({ message: 'Password reset email sent successfully!' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static verifyLoguin(req, res) {
    res.json({ username: req.session.username || null });
  }
  static async handlePasswordForm(req, res) {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match!" });
    }
    try {
      const userInstance = new userModel();
      const user = await userInstance.findUserByResetToken(token);
      if (!user || user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await userInstance.updateUserPassword(user.id, hashedPassword);
      res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async verifyAccount(req, res) {
    const { verificationCode } = req.body;
    console.log("Received verification code:", verificationCode);
    try {
        const userInstance = new userModel();
        // Retrieve user with the given verification code
        const user = await userInstance.getUserByVerificationCode(verificationCode);
        console.log("User found:", user);
        if (!user) {
          console.log("No user found for the given verification code");
          return res.status(400).json({ error: "Invalid verification code." });
        }

        // Check if the code has expired
        const currentTime = new Date();
        console.log("Current Time:", currentTime);
        console.log("Verification Expires:", user.verificationExpires);
        if (currentTime > new Date(user.verificationExpires)) {
          console.log("Verification code has expired");
          return res.status(400).json({ error: "Verification code has expired." });
        }

        // Update user as verified
        const affectedRows = await userInstance.updateUserAsVerified(verificationCode);
        console.log(`${affectedRows} rows updated`);
        console.log("Affected Rows:", affectedRows);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Account verified successfully!' });
        } else {
            res.status(400).json({ error: "Failed to verify account." });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }


}
export default userController