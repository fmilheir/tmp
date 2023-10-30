import express from 'express';
const router = express.Router();    
import userController from '../Controllers/userControl.mjs';



router.get('/all', userController.getAllUsersController); // /users/all is the path to the controller this will need to be handled with react!! it returns a json object
















export default router;