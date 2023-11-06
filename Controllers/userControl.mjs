import user from '../Models/userModel.mjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const EXPIRES_IN = process.env.EXPIRES_IN
const JWT_SECRET = process.env.JWT_SECRET

class userController {
  

  static async getAllUsersController(req, res) {
    try {
      const users = await new user().getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async addUserController(req, res) {
    const { username, email, password, permission_level } = req.body;
    try {
      const userId = await new user().addUser(username, email, password, permission_level);
      res.json({ userId });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
    
  static async deleteUserController(req, res) {
    const userId = req.params.userId;
    try {
      const affectedRows = await new user().deleteUser(userId);
      if (affectedRows > 0) {
        res.json({ message: 'User deleted successfully.' });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  static async getUserByUsernameController(req, res) {
    const username = req.params.username;
    try {
      const get_user = await new user().getUserByUsername(username);
      if (get_user) {
        res.json(get_user);
      }
      else if(!username){
        res.status(400).json({error:'Username is requierd.'})
      }
      else {
         res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try{
      const { username, password } = req.body;
      if(!username || !password)
        res.status(400).json({error: 'Username and password are required.'});
      const isValid = await new user().validateUserPassword(username, password);
      console.log(`conaaaa ${isValid}`);
      if (isValid == false) {
        res.status(401).json({ error: 'Wrong username or password!' });
      }
      else if ((isValid == false) && (await new user().getUserByUsername(username) == true)){
        res.status(404).json({ error: 'Wrong username or password!' });}
      else{
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: EXPIRES_IN });
        res.status(200).json({ message: "Login successful!", token, user: { username } });
      }
    } catch (error) {
      // console.error('Login error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
export default userController