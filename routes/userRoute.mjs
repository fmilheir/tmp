import express from 'express';
const router = express.Router();    
import userController from '../Controllers/userControl.mjs';



router.get('/all', userController.getAllUsersController);

app.post('/users', userController.addUserController);

app.delete('/users/:userId', userController.deleteUserController);

router.get('/users/username/:username', UserController.getUserByUsernameController);

