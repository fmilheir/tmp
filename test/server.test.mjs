import request from 'supertest';
import app from '../public/scripts/server.mjs'; 

describe('Express server', () => {
  it('Should redirect to the /public/index.html on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    // Depending on how your express.static is set up, this might just be '/index.html'
    expect(response.header['location']).toEqual('/public/index.html');
  });

  // The server should return a 404 status code when a GET request is made to a nonexistent URL.
  it('Should return 404 on GET /non-existent-path', async () => {
    const response = await request(app).get('/non-existent-path');
    expect(response.status).toBe(404);
  });

  // The server should return a 200 status code when a GET request is made to /public/index.html.
  it('Should return 200 on GET /public/index.html', async () => {
    const response = await request(app).get('/public/index.html');
    expect(response.status).toBe(200);
  });
});
