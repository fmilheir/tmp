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

  // Other test cases follow similarly...
});


