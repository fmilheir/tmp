import request from 'supertest';
import user from '../Models/userModel.mjs';
import userController from '../Controllers/userControl.mjs';
import { jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';



// Mocks
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));
  jest.mock('bcrypt', () => ({
    compare: jest.fn(),
  }));
  
  // Set up environment variables for testing purposes
  const JWT_SECRET = 'testsecret';
  const EXPIRES_IN = '1h';

it('should return a token and user object when login is successful', async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: 'validUsername',
        password: 'validPassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);

    // Mock jwt sign method
    jwt.sign = jest.fn().mockReturnValue('mockToken');

    // Call the login method
    await userController.login(req, res);

    // Assertions
    expect(userInstance.validateUserPassword).toHaveBeenCalledWith('validUsername', 'validPassword');
    expect(jwt.sign).toHaveBeenCalledWith({ username: 'validUsername' }, JWT_SECRET, { expiresIn: EXPIRES_IN });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful!', token: 'mockToken', user: { username: 'validUsername' } });
});

// Login with invalid username and password returns an error message
it('should return an error message when login is unsuccessful', async () => {
    // Mock req and res objects
    const req = {
        body: {
            username: 'invalidUsername',
            password: 'invalidPassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
  
    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(false);
  
    // Call the login method
    await userController.login(req, res);
  
    // Assertions
    expect(userInstance.validateUserPassword).toHaveBeenCalledWith('invalidUsername', 'invalidPassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
});
// JWT token is created with correct username and secret key
it('should create a JWT token with correct username and secret key', async () => {
    // Mock req and res objects
    const req = {
        body: {
            username: 'validUsername',
            password: 'validPassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
  
    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);
  
    // Mock jwt sign method
    jwt.sign = jest.fn().mockReturnValue('mockToken');
  
    // Call the login method
    await userController.login(req, res);
  
    // Assertions
    expect(jwt.sign).toHaveBeenCalledWith({ username: 'validUsername' }, JWT_SECRET, { expiresIn: EXPIRES_IN });
});
// Password with invalid format returns an error message
it('should return an error message when password has invalid format', async () => {
    // Mock req and res objects
    const req = {
        body: {
            username: 'validUsername',
            password: 'invalidPassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
  
    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);
  
    // Call the login method
    await userController.login(req, res);
  
    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
});


// Username with invalid format returns an error message
it('should return an error message when username has invalid format', async () => {
    // Mock req and res objects
    const req = {
        body: {
            username: 'invalidUsername',
            password: 'validPassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
  
    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);
  
    // Call the login method
    await userController.login(req, res);
  
    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
});


it('should handle database connection errors gracefully', async () => {
    const req = {
        body: {
            username: 'validUsername',
            password: 'validPassword'
        }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
      
    // Simulate a database error
    const userInstance = new user();
    userInstance.validateUserPassword = jest.fn().mockRejectedValue(new Error('Database connection error'));
      
    // Call the login method
    await userController.login(req, res);
      
    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
});
it('should return 400 if username or password is missing', async () => {
    const req = {
        body: {
            username: '', // Missing username
            password: 'validPassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
      
    // Call the login method without username
    await userController.login(req, res);
      
    // Assertions for missing username
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required.' });
      
    // Reset mocks
    jest.clearAllMocks();
      
    // Update body to have missing password
    req.body = {
        username: 'validUsername',
        password: '' // Missing password
    };
      
    // Call the login method without password
    await userController.login(req, res);
      
    // Assertions for missing password
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required.' });
});

it('should return 404 if the user does not exist', async () => {
    const req = {
        body: {
            username: 'nonExistentUsername',
            password: 'somePassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
      
    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.getUserByUsername = jest.fn().mockResolvedValue(null); // No user found
      
    // Call the login method
    await userController.login(req, res);
      
    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
});



it('should not allow login with correct username but incorrect password', async () => {
    const req = {
        body: {
            username: 'validUsername',
            password: 'wrongPassword'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
      
    // Mock user instance and validateUserPassword method
    const userInstance = new user();
    userInstance.getUserByUsername = jest.fn().mockResolvedValue({ username: 'validUsername', password: 'hashedPassword' }); // User found
    bcrypt.compare = jest.fn().mockResolvedValue(false); // Password comparison fails
      
    // Call the login method
    await userController.login(req, res);
      
    // Assertions
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
});
      
it('should return a token and user object when login is successful', async () => {
    const req = {
      body: {
        username: 'validUsername',
        password: 'validPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    // Setup mocks for bcrypt and jwt
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockToken');
  
    const userInstance = new UserModel();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);
  
    // Call the login method
    await userController.login(req, res);
  
    // Assertions
    expect(userInstance.validateUserPassword).toHaveBeenCalledWith('validUsername', 'validPassword');
    expect(jwt.sign).toHaveBeenCalledWith({ username: 'validUsername' }, JWT_SECRET, { expiresIn: EXPIRES_IN });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful!',
      token: 'mockToken',
      user: { username: 'validUsername' },
    });
});            