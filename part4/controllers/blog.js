const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  if (!request.body.likes) { request.body.likes = 0; }
  if (!request.body.title && !request.body.url) { return response.status(400).end(); }

  const { body } = request;

  const user = await User.findById(body.user);

  /*eslint-disable*/
  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    },
  );

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});
/* eslint-enable */

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
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
