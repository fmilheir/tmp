import express from 'express';
import userController from '../Controllers/userControl.mjs';
import { PERMISSION_LEVELS } from '../public/scripts/permissions.mjs';
import { isAuthenticated, isAdmin } from '../middleware/isAdmin.mjs';



const router = express.Router(); 

router.get('/all', userController.getAllUsersController);
router.post('/users', userController.addUserController);
router.delete('/users/:userId', userController.deleteUserController);
router.get('/users/username/:username', userController.getUserByUsernameController);
router.post('/signup', async(res, req) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        // Use a default permission level or based on the provided value
        const permission_level = PERMISSION_LEVELS.USER;
        const userId = await userModel.addUser(username, email, password, permission_level);
        res.statusCode(201).json({ userId });
    } catch (error) {
        res.statusCode(500).json({ error: error.message });
    }
});

router.post('/admin-signup', isAuthenticated, isAdmin, async (req, res) => {
    // isAuthenticated and isAdmin are middleware functions that check if the if the user is an admin
    const { username, email, password, confirmPassword } = req.body;

    try{
        const permission_level= PERMISSION_LEVELS.ADMIN;  // Set for the admin
        const userId = await userModel.addUser(username, email, password, permission_level);
        res.status(201).json({ userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;