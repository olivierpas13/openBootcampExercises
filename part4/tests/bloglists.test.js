const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
/*eslint-disable*/
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
  /* eslint-enable */
});

describe('GET /api/blogs', () => {
  test('blogs are returned as a json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns the correct amount of blog posts', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200);

    const { body: listOfBlogs } = response;

    expect(listOfBlogs[0].id).toBeDefined();
  });
});

describe('POST /api/blogs', () => {
  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Phonebook app',
      author: 'Olivier Paspuel',
      url: 'https://phonebookaplicacion.herokuapp.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const response = await api.get('/api/blogs');

    const { body: blogs } = response;

    const addedBlog = blogs.find((blog) => blog.title === newBlog.title);

    expect(addedBlog.likes).toBe(0);
  });

  test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const newBlog = {
      author: 'Olivier Paspuel',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

describe('DELETE /api/blogs/:id', () => {
  test('when given a valid id, the blog gets deleted', async () => {
    const response = await api.get('/api/blogs');
    const { body: listOfBlogs } = response;

    const blogToBeDeleted = listOfBlogs.find((blog) => blog.title === 'React patterns');

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(204);

    const responseAfterDelete = await api.get('/api/blogs');
    const { body: listOfBlogsAfterDelete } = responseAfterDelete;
    expect(listOfBlogsAfterDelete).toHaveLength(listOfBlogs.length - 1);

    expect(responseAfterDelete).not.toContain(blogToBeDeleted);
  });

  test('when given an invalid id, the backend responds with the status code 404', async () => {
    await api
      .delete('/api/blogs/123')
      .expect(404);
  });
});

describe('UPDATE/PUT /api/blogs/:id', () => {
  test('when given a valid id, the blog gets updated', async () => {
    const response = await api.get('/api/blogs');
    const { body: listOfBlogs } = response;

    const blogToBeUpdated = {
      title: listOfBlogs[0].title,
      author: listOfBlogs[0].author,
      url: listOfBlogs[0].url,
      likes: listOfBlogs[0].likes + 13,
    };

    await api
      .put(`/api/blogs/${listOfBlogs[0].id}`)
      .send(blogToBeUpdated)
      .expect(200);

    const responseAfterUpdate = await api.get('/api/blogs');
    const { body: listOfBlogsAfterUpdate } = responseAfterUpdate;
    expect(listOfBlogsAfterUpdate).toHaveLength(listOfBlogs.length);
    expect(listOfBlogsAfterUpdate).toContainEqual(
      {
        id: listOfBlogs[0].id,
        title: listOfBlogs[0].title,
        author: listOfBlogs[0].author,
        url: listOfBlogs[0].url,
        likes: listOfBlogs[0].likes + 13,
      },
    );
  });
  test('when given an invalid id, the backend responds with the status code 404', async () => {
    const response = await api.get('/api/blogs');
    const { body: listOfBlogs } = response;

    const blogToBeUpdated = {
      title: listOfBlogs[0].title,
      author: listOfBlogs[0].author,
      url: listOfBlogs[0].url,
      likes: listOfBlogs[0].likes + 13,
    };
    await api
      .put('/api/blogs/123')
      .send(blogToBeUpdated)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
