import React, { useState } from 'react';
import blogService from '../services/blogs';

function Blog({
  blog, blogs, setBlogs, loggedUser,likeBlog
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
          <div style={blogStyle}>
            <p>
              {blog.title}
            </p>
            <p>
              {blog.author}
            </p>
            <button onClick={toggleVisibility}>View</button>
          </div>

        )
        : (
          <div style={blogStyle}>
            <p>
              {blog.title}
              {' '}
              <button onClick={toggleVisibility}>Hide</button>
            </p>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              {' '}
              <button onClick={() => likeBlog(blog, blogs, setBlogs)}>Like</button>
            </p>
            <p>{blog.author}</p>
            {(blog.user.username === loggedUser)
              ? <button onClick={(e) => removeBlog(e)}>Delete</button>
              : <></>}
          </div>
        )}
    </div>
  );
}

export default Blog;
