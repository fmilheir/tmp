import userController from '../Controllers/userControl.mjs';
import userModel from '../Models/userModel.mjs';
import bcrypt from 'bcryptjs';
import { sendConfirmationEmail } from '../Controllers/emailController.mjs';



describe('userController', () => {


  beforeEach(() => {
    jest.resetModules(); // This resets the module registry - the cache of all required modules
    jest.clearAllMocks(); // This clears all mocks so that previous test runs don't interfere
  });


  // getAllUsersController returns all users
  it('should return all users when getAllUsersController is invoked', async () => {

    jest.mock('../Models/userModel.mjs', () => {
      return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
          return {
            getAllUsers: jest.fn().mockResolvedValue([{ id: 1, username: 'john' }, { id: 2, username: 'jane' }]),
            getUserByUsername: jest.fn(),
            addUser: jest.fn(),
            // ... any other methods that need to be mocked
          };
        })
      };
    });
    

    const userController = require('../Controllers/userControl.mjs').default;

    // Create mock request and response objects
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  
    // Invoke the getAllUsersController method
    await userController.getAllUsersController(req, res);
  
    // Expect the response to contain all users
    expect(res.json).toHaveBeenCalledWith([{ id: 1, username: 'john' }, { id: 2, username: 'jane' }]);
  });



  


  

  // addUserController returns an error if the username is already taken
  it('should return an error if the username is already taken', async () => {
    // Mock userModel and its getUserByUsername method
    const userModelMock = jest.fn().mockImplementation(() => ({
      getUserByUsername: jest.fn().mockResolvedValue({username: 'john'})
    }));
    jest.doMock('../Models/userModel.mjs', () => userModelMock);
    jest.resetModules();
    const userController = require('../Controllers/userControl.mjs').default;
    const req = {
      body: {
        username: 'john',
        email: 'john@example.com',
        password: 'password123',
        permission_level: 'user'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await userController.addUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username already exists.' });
  });

});
