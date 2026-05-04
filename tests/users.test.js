import request from 'supertest';
import app from '../app.js';
import { pool } from '../config/db.js';
import mongoose from 'mongoose';

afterAll(async () => {
  await pool.end();
  await mongoose.connection.close();
});

describe('Users API', () => {

  it('GET /users → should return 200 and users array', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /users → if users exist, validate structure', async () => {
    const res = await request(app).get('/users');

    const users = res.body.data;

    if (users.length > 0) {
      const user = users[0];

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    }
  });

  it('POST /users → should create a user', async () => {
    const newUser = {
      email: `test_${Date.now()}@mail.com`, // evita duplicados
      name: "Alan Revilla",
      password: "123456",
      phone: "+525578945612",
      tax_id: "TEST930101901",
      addresses: [
        {
          street: "Test",
          city: "CDMX",
          country: "MX"
        }
      ]
    };

    const res = await request(app)
      .post('/users')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.email).toBe(newUser.email);
  }, 10000); // timeout extendido para DB

  it('POST /users → should fail if email is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alan' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET unknown route → should return 404', async () => {
    const res = await request(app).get('/not-found');

    expect(res.statusCode).toBe(404);
  });

});