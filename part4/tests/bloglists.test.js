const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

let token = '';
let userId = '';

const initialBlogs = [
  {
    title: 'React patterns',
    user: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    user: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    user: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

const initialUser = {
  username: 'testuser',
  name: 'Olivier',
  password: 'supersecret',
};
beforeAll(async () => {
  await User.deleteMany({});
  await api
    .post('/api/users/')
    .send(initialUser);

  const response = await api.get('/api/users/');
  userId = response.body[0].id;

  const loggedUser = await api
    .post('/api/login/')
    .send(
      {
        username: 'testuser',
        password: 'supersecret',
      },
    );
  /* eslint-disable */
  token = (`Bearer ${loggedUser._body.token}`);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of initialBlogs) {
    const blogObject = new Blog(
      {
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
        user: userId,
      },
    );
    await blogObject.save();
  }
  /* eslint-enable */
});

describe('GET /api/blogs', () => {
  test('blogs are returned as a json', async () => {
    await api
      .get('/api/blogs')
      .set({ Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns the correct amount of blog posts', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: token })
      .expect(200);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: token })
      .expect(200);

    const { body: listOfBlogs } = response;

    expect(listOfBlogs[0].id).toBeDefined();
  });
});

describe('POST /api/blogs', () => {
  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Phonebook app',
      author: initialUser.username,
      url: 'https://phonebookaplicacion.herokuapp.com/',
    };

    await api
      .post('/api/blogs/')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201);

    const response = await api.get('/api/blogs').set({ Authorization: token });

    const { body: blogs } = response;

    const addedBlog = blogs.find((blog) => blog.title === newBlog.title);

    expect(addedBlog.likes).toBe(0);
  });

  test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const newBlog = {
      author: initialUser.username,
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400);
  });
  test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      author: initialUser.username,
      likes: 7,
    };
    await api
      .post('/api/blogs')
      // .set({ Authorization: token })
      .send(newBlog)
      .expect(401);
  });
});

describe('DELETE /api/blogs/:id', () => {
  test('when given a valid id, the blog gets deleted', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: token });
    const { body: listOfBlogs } = response;

    const blogToBeDeleted = await Blog.findOne({ title: 'React patterns' });
    /* eslint-disable */
    const id = blogToBeDeleted._id.toString();
    /* eslint-enable */
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: token })
      .expect(204);

    const responseAfterDelete = await api.get('/api/blogs').set({ Authorization: token });
    const { body: listOfBlogsAfterDelete } = responseAfterDelete;
    expect(listOfBlogsAfterDelete).toHaveLength(listOfBlogs.length - 1);

    expect(responseAfterDelete).not.toContain(blogToBeDeleted);
  });

  test('when given an invalid id, the backend responds with the status code 404', async () => {
    await api
      .delete('/api/blogs/123')
      .set({ Authorization: token })
      .expect(404);
  });
});

describe('UPDATE/PUT /api/blogs/:id', () => {
  test('when given a valid id, the blog gets updated', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: token });
    const { body: listOfBlogs } = response;

    const blogToBeUpdated = {
      title: listOfBlogs[0].title,
      author: initialUser.username,
      url: listOfBlogs[0].url,
      likes: listOfBlogs[0].likes + 13,
    };

    await api
      .put(`/api/blogs/${listOfBlogs[0].id}`)
      .set({ Authorization: token })
      .send(blogToBeUpdated)
      .expect(200);

    const responseAfterUpdate = await api.get('/api/blogs').set({ Authorization: token });
    const { body: listOfBlogsAfterUpdate } = responseAfterUpdate;
    expect(listOfBlogsAfterUpdate).toHaveLength(listOfBlogs.length);
    expect(listOfBlogsAfterUpdate).toContainEqual(
      {
        id: listOfBlogs[0].id,
        title: listOfBlogs[0].title,
        author: initialUser.username,
        url: listOfBlogs[0].url,
        likes: listOfBlogs[0].likes + 13,
        user: {
          id: userId,
          name: 'Olivier',
          username: 'testuser',
        },
      },

    );
  });
  test('when given an invalid id, the backend responds with the status code 404', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: token });
    const { body: listOfBlogs } = response;

    const blogToBeUpdated = {
      title: listOfBlogs[0].title,
      url: listOfBlogs[0].url,
      author: initialUser.username,

      likes: listOfBlogs[0].likes + 13,
    };
    await api
      .put('/api/blogs/123')
      .send(blogToBeUpdated)
      .set({ Authorization: token })
      .expect(404);
  });
});

afterAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  mongoose.connection.close();
});
