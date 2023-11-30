import express from 'express';
import userController from '../Controllers/userControl.mjs';
import userModel from '../Models/userModel.mjs'; // Make sure to import the userModel
import { PERMISSION_LEVELS } from '../public/scripts/permissions.mjs';
import { isAuthenticated, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

(async () => {
    console.log(await userController.doesUserExist("admin"));
  
    if (!(await userController.doesUserExist("admin"))) {
      console.log("Creating admin user");
      await userController.addUserControllerManual("admin", "admin@gmail.com", "admin", PERMISSION_LEVELS.ADMIN);
      console.log("Admin user created");
    }
  })();

router.get('/all', userController.getAllUsersController);
router.post('/signup', userController.addUserController); 
router.delete('/users/:userId', userController.deleteUserController); 
router.get('/users/username/:username', userController.getUserByUsernameController);
router.get('/verifylogin', userController.verifyLogin);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/verify-account', userController.verifyAccount);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.handlePasswordForm);
router.post("/logout", (_req, res) => {
    // clear cookies
    res.clearCookie("refreshtoken");
    return res.json({
      message: "Logged out successfully! 🤗",
      type: "success",
    });
  });
router.post('/admin-signup', isAuthenticated, isAdmin, async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const userInstance = new userModel();
        const permission_level = PERMISSION_LEVELS.ADMIN;
        const userId = await userInstance.addUser(username, email, password, permission_level);
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
            res.status().json({ message: 'Username already exists.' });
        } else {
            res.status(200).json({ message: 'Username is available.' });
        }
    } catch (error) {
        // console.error('Error in the checkUsername route: ', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
