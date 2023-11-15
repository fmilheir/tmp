import userController from '../Controllers/userControl';
import userModel from '../Models/userModel';
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
  
    // Returns a list of all users when getAllUsers method is called successfully
    it('should return a list of all users when getAllUsers method is called successfully', async () => {
      const req = {};
      const res = {
        json: (data) => {
          expect(data).toEqual(users);
        },
        status: (code) => {
          return {
            json: (data) => {
              expect(data).toEqual({ error: err });
            }
          }
        }
      };

      const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      const userModelInstance = new userModel();
      userModelInstance.getAllUsers = jest.fn().mockResolvedValue(users);

      await userController.getAllUsersController(req, res);

      expect(userModelInstance.getAllUsers).toHaveBeenCalled();
    });
        // Returns a JSON response with the list of users when getAllUsers method is called successfully
    it('should return a JSON response with the list of users when getAllUsers method is called successfully', async () => {
      const req = {};
      const res = {
        json: (data) => {
          expect(data).toEqual(users);
        },
        status: (code) => {
          return {
            json: (data) => {
              expect(data).toEqual({ error: err });
            }
          }
        }
      };

      const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      const userModelInstance = new userModel();
      userModelInstance.getAllUsers = jest.fn().mockResolvedValue(users);

      await userController.getAllUsersController(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });

  // Returns a list of all users when getAllUsers method is called successfully
  it('should return a list of all users when getAllUsers method is called successfully', async () => {
    const req = {};
    const res = {
      json: (data) => {
        expect(data).toEqual(users);
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).toEqual({ error: err });
          }
        }
      }
    };

    const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
    const userModelInstance = new userModel();
    userModelInstance.getAllUsers = jest.fn().mockResolvedValue(users);

    await userController.getAllUsersController(req, res);

    expect(userModelInstance.getAllUsers).toHaveBeenCalled();
  });

  // Returns a JSON response with the list of users when getAllUsers method is called successfully
  it('should return a JSON response with the list of users when getAllUsers method is called successfully', async () => {
    const req = {};
    const res = {
      json: (data) => {
        expect(data).toEqual(users);
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).toEqual({ error: err });
          }
        }
      }
    };

    const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
    const userModelInstance = new userModel();
    userModelInstance.getAllUsers = jest.fn().mockResolvedValue(users);

    await userController.getAllUsersController(req, res);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  // Returns a 200 status code when getAllUsers method is called successfully
  it('should return a 200 status code when getAllUsers method is called successfully', async () => {
    const req = {};
    const res = {
      json: (data) => {
        expect(data).toEqual(users);
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).toEqual({ error: err });
          }
        }
      }
    };

    const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
    const userModelInstance = new userModel();
    userModelInstance.getAllUsers = jest.fn().mockResolvedValue(users);

    await userController.getAllUsersController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // Returns a 500 status code and an error message when an error occurs while calling getAllUsers method
  it('should return a 500 status code and an error message when an error occurs while calling getAllUsers method', async () => {
    const req = {};
    const res = {
      json: (data) => {
        expect(data).toEqual({ error: err });
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).toEqual({ error: err });
          }
        }
      }
    };

    const err = 'Internal server error';
    const userModelInstance = new userModel();
    userModelInstance.getAllUsers = jest.fn().mockRejectedValue(err);

    await userController.getAllUsersController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // Returns a JSON response with an error message when an error occurs while calling getAllUsers method
  it('should return a JSON response with an error message when an error occurs while calling getAllUsers method', async () => {
    const req = {};
    const res = {
      json: (data) => {
        expect(data).toEqual({ error: err });
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).toEqual({ error: err });
          }
        }
      }
    };

    const err = 'Internal server error';
    const userModelInstance = new userModel();
    userModelInstance.getAllUsers = jest.fn().mockRejectedValue(err);

    await userController.getAllUsersController(req, res);

    expect(res.json).toHaveBeenCalledWith({ error: err });
  });

    // Returns a JSON response with an error message when an error occurs while calling getAllUsers method
    it('should return a JSON response with an error message when an error occurs while calling getAllUsers method', async () => {
      const req = {};
      const res = {
        json: (data) => {
          expect(data).toEqual({ error: err });
        },
        status: (code) => {
          return {
            json: (data) => {
              expect(data).toEqual({ error: err });
            }
          }
        }
      };

      const err = 'Internal server error';
      const userModelInstance = new userModel();
      userModelInstance.getAllUsers = jest.fn().mockRejectedValue(err);

      await userController.getAllUsersController(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: err });
    });

    
});
  