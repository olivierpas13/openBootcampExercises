const _ = require('lodash');

const totalLikes = (blogs) => {
  if (blogs.length === 0) { return 0; }
  return blogs.reduce((acc, obj) => acc + obj.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return undefined; }
  return blogs.reduce((favorite, blog) => (favorite.likes > blog.likes ? favorite : blog));
};

const mostBlogs = (arr) => {
  if (arr.length === 0) { return undefined; }
  if (arr.length === 1) { return { author: arr[0].author, blogs: 1 }; }
  const tagArray = _.map(arr, 'author');
  const hashmap = tagArray.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b]
    ? { author: a, blogs: hashmap[a] }
    : { author: b, blogs: hashmap[b] }));
};

const mostLikes = (arr) => {
  if (arr.length === 0) { return undefined; }
  const result = Object.values(
    arr.reduce((acc, blog) => {
      acc[blog.author] = acc[blog.author]
        ? { ...blog, likes: blog.likes + acc[blog.author].likes }
        : blog;
      return acc;
    }, {}),
  );
  const mostVoted = (
    result.find((blg) => blg.likes === Math.max(...result.map((blog) => blog.likes))));

  return { author: mostVoted.author, likes: mostVoted.likes };
};

module.exports = {
  mostLikes,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
