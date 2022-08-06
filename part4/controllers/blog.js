const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body.likes) { request.body.likes = 0; }
    if (!request.body.title && !request.body.url) { return response.status(400).end(); }
    const { body } = request;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    /*eslint-disable*/
    const blog = new Blog(
      {
        title: body.title,
        author: decodedToken.username,
        url: body.url,
        likes: body.likes,
        user: user._id,
      },
    );

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return response.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});
/* eslint-enable */

blogRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { token } = request;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    // console.log(user);

    if (!(user.blogs.find((blog) => blog._id.toString() === id.toString()))) { return response.status(400).json({ error: 'Not the creatror' }); }
    // console.log(decodedToken);

    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (e) {
    response.status(404).end();
  }
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  if (!body.likes) { body.likes = 0; }
  if (!body.title && !body.url) { return response.status(400).end(); }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    return response.status(200).json(updatedBlog);
  } catch (error) {
    return response.status(404).end();
  }
});

module.exports = blogRouter;
