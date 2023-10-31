import assert from 'assert';
import UserModel from '../Models/userModel.mjs';
import userController from '../Controllers/userControl.mjs';
import PointsOfInterestModel from '../Models/poiModel.mjs';
import PointsOfInterestController from '../Controllers/poiControl.mjs';

describe('User Model and Controller Tests', () => {
  it('should retrieve a user by username', async () => {
    const userModel = new UserModel();

    // Insert a test user into the database
    const testUser = {
      username: 'testuser',
      // Add other user properties here
    };

    const result = await userModel.addUser(testUser);

    // Test the getUserByUsernameController
    const req = { params: { username: 'testuser' } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.username, 'testuser');
      },
      status: (code) => {
        assert.strictEqual(code, 200);
        return res;
      },
    };

    await UserController.getUserByUsernameController(req, res);

    // Clean up: delete the test user
    await userModel.deleteUser(result.userId);
  });
});
