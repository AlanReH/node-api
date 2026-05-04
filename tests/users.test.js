import request from 'supertest';
import app from '../app.js';

describe('GET /users', () => {
  it('should return 200 and users array', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

it('should return user with required fields', async () => {
  const res = await request(app).get('/users');

  const user = res.body.data[0];

  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
});

// CREATE USER
it('should create a user', async () => {
  const res = await request(app)
    .post('/users')
    .send({
        email: "test@mail.com",
        name: "Alan Revilla",
        password: "123456",
        phone: "+525578945612",
        tax_id: "TEST930101456"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.data).toHaveProperty('id');
});

// it('should fail if email is missing', async () => {
//   const res = await request(app)
//     .post('/users')
//     .send({ name: 'Alan' });

//   expect(res.statusCode).toBe(400);
// });

it('should return 404 if route does not exist', async () => {
  const res = await request(app).get('/not-found');

  expect(res.statusCode).toBe(404);
});