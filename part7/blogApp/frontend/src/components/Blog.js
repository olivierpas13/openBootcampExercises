import React, { useState } from 'react';
import blogService from '../services/blogs';

function Blog({
  blog, blogs, setBlogs, loggedUser, likeBlog,
}) {
  const [visibility, setVisibility] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const removeBlog = async (e) => {
    e.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
      const newList = blogs.filter((blg) => blg.id !== blog.id);
      setBlogs([...newList]);
    }
  };

  return (

    <div>
      {visibility
        ? (
          <div className="blog" style={blogStyle}>
            <p>
              {blog.title}
            </p>
            <p>
              {blog.author}
            </p>
            <button type="button" onClick={toggleVisibility}>View</button>
          </div>

        )
        : (
          <div className="blog" style={blogStyle}>
            <p>
              {blog.title}
              {' '}
              <button type="button" onClick={toggleVisibility}>Hide</button>
            </p>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              {' '}
              <button type="button" className="likeButton" onClick={() => likeBlog(blog, blogs, setBlogs)}>Like</button>
            </p>
            <p>{blog.author}</p>
            {(blog.user.username === loggedUser)
              ? <button type="button" onClick={(e) => removeBlog(e)}>Delete</button>
              // fragment
              : null }
          </div>
        )}
    </div>
  );
}

export default Blog;
