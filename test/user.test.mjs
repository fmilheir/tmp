import request from 'supertest';
import userModel from '../Models/userModel.mjs';
import userController from '../Controllers/userControl.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../public/scripts/pool.mjs';

// Mocks
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));
jest.mock('../public/scripts/pool.mjs', () => {
  const mockQuery = jest.fn();
  return {
    query: mockQuery,
  };
});

jwt.sign = jest.fn().mockReturnValue('mockToken');
describe("User Controller Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jwt.sign.mockClear();
  });

  // Set up environment variables for testing purposes
  const JWT_SECRET = 'testsecret';
  const EXPIRES_IN = '1h';

  it('should return a token and user object when login is successful', async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: 'test',
        password: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock user instance and validateUserPassword method
    const userInstance = new userModel();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);

    // Mock jwt sign method
    jwt.sign.mockReturnValue('mockToken');

    // Call the login method
    await userController.login(req, res);

    // Assertions
    expect(userInstance.validateUserPassword).toHaveBeenCalledWith('test', 'test');
    expect(jwt.sign).toHaveBeenCalledWith({ username: 'test' }, JWT_SECRET, { expiresIn: EXPIRES_IN });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful!', token: 'mockToken', user: { username: 'test' } });
  });

  it('should return an error message when login is unsuccessful', async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: 'invalidUsername',
        password: 'invalidPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    // Mock user instance and validateUserPassword method
    const userInstance = new userModel();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(false); // Mock that validation fails
  
    // Call the login method using the same userInstance
    await userController.login(req, res, userInstance);
  
    // Assertions
    expect(userInstance.validateUserPassword).toHaveBeenCalledWith('invalidUsername', 'invalidPassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
  });
  

  it('should create a JWT token with correct username and secret key', async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: 'test',
        password: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock user instance and validateUserPassword method
    const userInstance = new userModel();
    userInstance.validateUserPassword = jest.fn().mockResolvedValue(true);

    // Mock jwt sign method
    jwt.sign.mockReturnValue('mockToken');

    // Call the login method
    await userController.login(req, res);

    // Assertions
    expect(jwt.sign).toHaveBeenCalledWith({ username: 'test' }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  });

  it('should return an error message when password has an invalid format', async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: 'test',
        password: 'invalidPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the login method
    await userController.login(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
  });

  it('should return an error message when username has an invalid format', async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: 'invalidUsername',
        password: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the login method
    await userController.login(req, res);
    console.log(`fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuk    :${res.json} ANNND USERNAME: ${req.body}`);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
  });

  it('should handle database connection errors gracefully', async () => {
    const req = {
      body: {
        username: 'test',
        password: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate a database error
    const userInstance = new userModel();
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
        username: null, // Missing username
        password: 'test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
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
      username: 'test',
      password: '', // Missing password
    };

    // Call the login method without a password
    await userController.login(req, res);

    // Assertions for missing password
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required.' });
  });

  it('should return 404 if the user does not exist', async () => {
    const req = {
      body: {
        username: 'vhb',
        password: 'yuguv',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.login(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  it('should not allow login with correct username but incorrect password', async () => {
    const req = {
      body: {
        username: 'test',
        password: 'somepassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock user instance and getUserByUsername method
    const userInstance = new userModel();
    userInstance.getUserByUsername = jest.fn().mockResolvedValue({ username: 'test' }); // User found

    // Mock bcrypt.compare method
    bcrypt.compare = jest.fn().mockResolvedValue(false); // Password comparison fails

    // Call the login method
    await userController.login(req, res);
    console.log(`fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuk    :${req.body.password} ANNND USERNAME: ${req.body.username}`);

    // Assertions
    expect(bcrypt.compare).toHaveBeenCalledWith('test', 'hashedPassword'); // Adjust this line according to your actual implementation
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Wrong username or password!' });
  });
});
