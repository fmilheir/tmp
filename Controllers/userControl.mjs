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
    // write any controller functions here! make sure it is static async!!!














}export default userController;