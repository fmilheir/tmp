import express from 'express';
import userController from '../Controllers/userControl.mjs';
import userModel from '../Models/userModel.mjs'; // Make sure to import the userModel
import { PERMISSION_LEVELS } from '../public/scripts/permissions.mjs';
import { isAuthenticated, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

router.get('/all', userController.getAllUsersController);
router.post('/users', userController.addUserController); // Use router, not app
router.delete('/users/:userId', userController.deleteUserController); // Use router, not app
router.get('/users/username/:username', userController.getUserByUsernameController);
router.post('/login', userController.login);
router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const userInstance = new userModel();
        const permission_level = PERMISSION_LEVELS.USER; // Default permission level
        const userId = await userInstance.addUser(username, email, password, permission_level);
        res.status(201).json({ userId }); 
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message }); // Send the correct status
    }
});

router.post('/admin-signup', isAuthenticated, isAdmin, async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const permission_level = PERMISSION_LEVELS.ADMIN;
        const userId = await userModel.addUser(username, email, password, permission_level);
        res.status(201).json({ userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/checkusername', async(req, res) => {
    // console.log('checkusername route hit');
    const { username } = req.body;
    try {
        const userModelInstance = new userModel(); 
        const user = await userModelInstance.getUserByUsername(username);
        if (user) {
            res.json({ message: 'Username already exists.' });
        } else {
            res.status(200).json({ message: 'Username is available.' });
        }
    } catch (error) {
        // console.error('Error in the checkUsername route: ', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
