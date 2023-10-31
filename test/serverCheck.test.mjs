import assert from 'assert';
import UserModel from '../Models/userModel.mjs';
import userController from '../Controllers/userControl.mjs';
import PointsOfInterestModel from '../Models/poiModel.mjs';
import PointsOfInterestController from '../Controllers/poiControl.mjs';

jest.mock('../public/scripts/pool.mjs', () => {
  const mockQuery = jest.fn();
  return {
    query: mockQuery,
  };
});

describe('User Model Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a user', async () => {
    const userModel = new UserModel();
    const mockInsertId = 1; // Adjust with your expected insert ID

    // Mock the query function to return a result
    const pool = require('../public/scripts/pool.mjs');
    pool.query.mockResolvedValueOnce([{ insertId: mockInsertId }]);

    const result = await userModel.addUser('testuser', 'password', 'admin');

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['testuser', 'password', 'admin']);
    expect(result).toBe(mockInsertId);
  });

   // Returns the user object when a valid username is provided
    it('should return the user object when a valid username is provided', async () => {
    const userModelObj = new UserModel();
    const pool = require('../public/scripts/pool.mjs');
    const mockUser = { id: 1, username: 'testUser', password: 'testPassword', permission_level: 'admin' };
    const mockPoolQuery = jest.spyOn(pool, 'query').mockResolvedValue([[mockUser]]);
  
    const result = await userModelObj.getUserByUsername('testUser');
  
    expect(mockPoolQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?', ['testUser']);
    expect(result).toEqual(mockUser);

    mockPoolQuery.mockRestore();
  });  

  it('should return undefined when an invalid username is provided', async () => {
    const userModelObj = new UserModel();
    const pool = require('../public/scripts/pool.mjs');
    const mockPoolQuery = jest.spyOn(pool, 'query').mockResolvedValue([[]]);

    const result = await userModelObj.getUserByUsername('invalidUser');

    expect(mockPoolQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?', ['invalidUser']);
    expect(result).toBeUndefined();

    mockPoolQuery.mockRestore();
  });

  // Returns the first user object when multiple users with the same username exist
  it('should return the first user object when multiple users with the same username exist', async () => {
    const userModelObj = new UserModel();
    const pool = require('../public/scripts/pool.mjs');
    const mockUsers = [
      { id: 1, username: 'testUser', password: 'testPassword1', permission_level: 'admin' },
      { id: 2, username: 'testUser', password: 'testPassword2', permission_level: 'user' }
    ];
    const mockPoolQuery = jest.spyOn(pool, 'query').mockResolvedValue([mockUsers]);

    const result = await userModelObj.getUserByUsername('testUser');

    expect(mockPoolQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?', ['testUser']);
    expect(result).toEqual(mockUsers[0]);

    mockPoolQuery.mockRestore();
  });
  
  // Returns null when a non-existent username is provided
  it('should return null when a non-existent username is provided', async () => {
    const userModelObj = new UserModel();
    const pool = require('../public/scripts/pool.mjs');
    const mockPoolQuery = jest.spyOn(pool, 'query').mockResolvedValue([[]]);
    
    const result = await userModelObj.getUserByUsername('nonExistentUser');
    
    expect(mockPoolQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?', ['nonExistentUser']);
    expect(result).toBeFalsy();
    
    mockPoolQuery.mockRestore();
  });
});


