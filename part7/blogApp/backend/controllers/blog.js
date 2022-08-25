const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    if (!request.body.likes) { request.body.likes = 0; }
    if (!request.body.title || !request.body.url) { return response.status(400).json({ error: 'Title and url required' }).end(); }
    const { body, user } = request;
    /*eslint-disable*/
    const blog = new Blog(
      {
        title: body.title,
        author: body.author ? body.author : user.username,
        url: body.url,
        likes: body.likes,
        user: user._id,
        comments: []
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

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const blog = await Blog.findById(id);
    return response.json(blog);
  } catch (error) {
    return next(error);
  }
});

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const { id } = request.params;
    const { user } = request;
    const blogs = await Blog.find({}).populate('user', { blogs: 0 });
    /* eslint-disable */
    if (!(blogs.find((blog) => blog.user._id.toString() === user.id.toString()))) { return response.status(400).json({ error: 'Unauthorized, user is not the creator of the blog' }); }
    /* eslint-enable */
    await Blog.findByIdAndDelete(id);
    return response.status(204).end();
  } catch (e) {
    return next(e);
  }
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body, user } = request;

  if (!body.likes) { body.likes = 0; }
  if (!body.title && !body.url) { return response.status(400).end(); }

  const blogToModify = await Blog.findById(id);

  const blog = {
    title: body.title,
    author: user ? user.username : body.author,
    url: body.url,
    likes: body.likes,
    comments: blogToModify.comments.concat(body.comments),
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    return response.status(200).json(updatedBlog);
  } catch (error) {
    return response.status(404).end();
  }
});

module.exports = blogRouter;
