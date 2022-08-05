const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', (request, response) => {
  if (!request.body.likes) { request.body.likes = 0; }
  if (!request.body.title && !request.body.url) { return response.status(400).end(); }
  const blog = new Blog(request.body);

  return blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

module.exports = blogRouter;
