import express from 'express';
import userController from '../Controllers/userControl.mjs';
import userModel from '../Models/userModel.mjs'; // Make sure to import the userModel
import { PERMISSION_LEVELS } from '../public/scripts/permissions.mjs';
import { isAuthenticated, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

router.get('/all', userController.getAllUsersController);

router.post('/signup', userController.addUserController); 

router.delete('/users/:userId', userController.deleteUserController); 
router.get('/users/username/:username', userController.getUserByUsernameController);
router.get('/verifylogin', userController.verifyLoguin);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/verify-account', userController.verifyAccount);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.handlePasswordForm);
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


//////// Swagger Annotations
//// Schema:
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *              - permission_level
 *          properties:
 *              username:
 *                  type: string
 *                  description: The username of the user.
 *              email:
 *                  type: string
 *                  description: The email address of the user.
 *              password:
 *                  type: string
 *                  description: The password of the user.
 *              permission_level:
 *                  type: integer
 *                  description: The permission level of the user.
 *          example:
 *              username: testuser
 *              email: testuser@exampl.com
 *              password: testpassword
 *              permission_level: 1
 */
//// Tag: 
/** 
 * @swagger
 * tags:
 *  name: Users
 *  description: User API management 
 *  
*/
/////// get all users
/**
* @swagger
* /user/all:
*   get:
*     summary: Get all users
*     tags: [Users]
*     description: Retrieve a list of all users.
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
/////////////// add user
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided username, email, password, and permission level.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *             
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The unique ID of the created user.
 *       409:
 *         description: Username already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the username already exists.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */


export default router;
