import user from '../Models/userModel.mjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const EXPIRES_IN = process.env.EXPIRES_IN
const JWT_SECRET = process.env.JWT_SECRET

class NotFoundError extends Error {}

class InternalServerError extends Error {}
class userController {
  

  static async getAllUsersController(req, res) {
    try {
      const users = await new user().getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async addUserController(req, res) {
    const { username, password, permission_level } = req.body;
    try {
      const userId = await new user().addUser(username, email, password, permission_level);
      res.json({ userId });
    } catch (err) {
      res.status(500).json({ error: err });
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
      res.status(500).json({ error: err });
    }
  }
  static async getUserByUsernameController(req, res) {
    const username = req.params.username;
    if(!username)
    res.status(400).json({ error: 'Username and password are required.' })
    try {
      const userInstance = new UserModel();
      const user = await userInstance.getUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: 'Wrong username or password!' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try{
      const { username, password } = req.body;
      const userInstance = new user();
      if(!username || !password)
        res.status(400).json({ error: 'Username and password are required.' })
      const isValid = await userInstance.validateUserPassword(username, password);
      if (isValid) {
        // Create token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: EXPIRES_IN });
        res.status(200).json({ message: "Login successful!", token, user: { username } });
      }else{
        res.status(401).json({ error: 'Wrong username or password!' });
      }
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).json({ error: 'Not Found' }); // 404 for not found
      } else if (err instanceof InternalServerError) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 for server error
      } else {
        res.status(400).json({ error: 'Bad Request' }); // 400 for other client errors
      }
    }
  }
}
export default userController