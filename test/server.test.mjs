import request from 'supertest';
import app from '../public/scripts/server.mjs';


describe('Express server', () =>{
    it('Should redirect to the /public/index.html on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toEqual(302);
        expect(response.header.location).toEqual('/public/index.html');
    });
})