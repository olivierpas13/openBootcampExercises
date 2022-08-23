const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

const initialUsers = [
  {
    username: 'first',
    name: 'Oliv Paspuel',
    password: '0987654321',
  },
  {
    username: 'second',
    name: 'Sol Paspuel',
    password: '098765432',
  },
  {
    username: 'third',
    name: 'Rob Paspuel',
    password: '09876543',
  },
];

beforeAll(async () => {
  // await User.deleteMany({});
});

beforeEach(async () => {
  await User.deleteMany({});
  /*eslint-disable*/
    for (const user of initialUsers) {
      const userObject = new User(user);
      await userObject.save();
    }
    /* eslint-enable */
});

describe('POST /api/users/', () => {
  test('Invalid user creation if no userName is given', async () => {
    const invalidUser = {
    //   username: 'Sonne7even',
      name: 'Oli',
      password: 1234,
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect({ error: 'Username and password required' });

    const response = await api.get('/api/users');

    const { body: users } = response;
    expect(users).toHaveLength(initialUsers.length);
  });
  test('Invalid user creation if no password is given', async () => {
    const invalidUser = {
      username: 'Sonne7even',
      name: 'Oli',
    //   password: 1234,
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect({ error: 'Username and password required' });

    const response = await api.get('/api/users');

    const { body: users } = response;

    expect(users).toHaveLength(initialUsers.length);
  });
  test('Invalid user creation if username and password length is less than 3 characters', async () => {
    const invalidUser = {
      username: 'So',
      name: 'Oli',
      password: 12,
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect({ error: 'Username and password length should be more than 3 characters' });

    const response = await api.get('/api/users');

    const { body: users } = response;

    expect(users).toHaveLength(initialUsers.length);
  });
  test('Invalid user creation if username already exists', async () => {
    const invalidUser = {
      username: 'first',
      name: 'Paspuel',
      password: '0987654321',
    };

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect({ error: 'Username should be unique' });

    const response = await api.get('/api/users');

    const { body: users } = response;

    expect(users).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
