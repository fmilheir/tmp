import userController from '../Controllers/userControl.mjs';
import userModel from '../Models/userModel.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
// Mocking modules
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));

jest.mock('../Models/userModel.mjs');
jest.mock('bcryptjs', () => ({
    hash: jest.fn(() => Promise.resolve('hashedPassword')),
    compare: jest.fn(),
}));
jest.mock('../Models/userModel.mjs', () => {
    return {
      __esModule: true, // this property makes it work with ES module import
      default: jest.fn().mockImplementation(() => {
        return {
          getAllUsers: jest.fn(),
          getUserByUsername: jest.fn(),
          addUser: jest.fn(),
          // ... other methods you want to mock
        };
      }),
    };
  });
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN;
describe('User Controller Tests', () => {
    let res;
    let mockUserModelInstance;
  
    beforeEach(() => {
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        jest.clearAllMocks();
      
        userModel.mockClear();
        jwt.sign.mockClear();
        bcrypt.hash.mockClear();
        bcrypt.compare.mockClear();
     
        mockUserModelInstance = {
            getAllUsers: jest.fn(),
            getUserByUsername: jest.fn(),
            addUser: jest.fn(),
            // ... other methods as needed
        };
      
        // Here you set the actual implementation of the mocked userModel
        userModel.mockImplementation(() => mockUserModelInstance);
    });
  

    it('should return all users when getAllUsersController is called', async () => {
        const mockUsers = [{ username: 'testuser1' }, { username: 'testuser2' }];
        const mockUserModelInstance = { getAllUsers: jest.fn().mockResolvedValue(mockUsers) };
        userModel.mockImplementation(() => mockUserModelInstance);
    
        await userController.getAllUsersController(null, res);
    
        expect(mockUserModelInstance.getAllUsers).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  
    /*it('should add a user and return their id when addUserController is called', async () => {
        const req = {
          body: {
            username: 'Filiper',
            email: 'ntestingr@google.com',
            password: 'Password1234',
            permission_level: 'user',
          },
        };
        const mockUserId = 1;
        const mockHashedPassword = 'hashedPassword';
        console.log(mockUserModelInstance.addUser.mock.calls);
        mockUserModelInstance.getUserByUsername.mockResolvedValue(null);
        mockUserModelInstance.addUser.mockResolvedValue(mockUserId);
        bcrypt.hash.mockResolvedValue(mockHashedPassword);
        console.log(req);
        await userController.addUserController(req, res);
    
        expect(mockUserModelInstance.getUserByUsername).toHaveBeenCalledWith(req.body.username);
        expect(mockUserModelInstance.addUser).toHaveBeenCalledWith(
          req.body.username,
          req.body.email,
          expect.any(String),
          req.body.permission_level
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ userId: mockUserId });
      });*/
});
  