import user from '../Models/userModel.mjs';

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
        const userId = await new user().addUser(username, password, permission_level);
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

      try {
        const userModel = new UserModel();
        const user = await userModel.getUserByUsername(username);

        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
}
export default userController