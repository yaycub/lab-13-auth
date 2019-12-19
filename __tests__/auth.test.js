require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: '12345'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          __v: 0 
        });
      }); 
  });

  it('can will throw error if email does not exist', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: '1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Email/Password',
          status: 403
        });
      });
  });

  it('will throw an error if password does not match', async() => {
    await User.create({ email: 'test@test.com', password: 'abc123' });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.com', password: 'abd124' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Email/Password',
          status: 403
        });
      });
  });

  it('can correcty login a user', async() => {
    const user = await User.create({ email: 'test@test.com', password: 'abc123' });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.com', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'test@test.com',
          __v: 0
        });
      });
  });

  it('has a cookie on signup', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: '12345'
      })
      .then(res => {
        expect(res.headers['set-cookie'][0]).toEqual(expect.any(String));
      }); 
  });

  it('has a cookie on login', async() => {
    await User.create({ email: 'test@test.com', password: 'abc123' });

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'abc123'
      })
      .then(res => {
        expect(res.headers['set-cookie'][0]).toEqual(expect.any(String));
      }); 
  });
});
