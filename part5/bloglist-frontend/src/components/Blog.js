import React, { useState } from 'react';
import blogService from '../services/blogs';

function Blog({
  blog, blogs, setBlogs, loggedUser,
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

  const updateLikes = async () => {
    const blogObj = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.updateBlog(blogObj);

    // Another way

    // const listWhitoutTheUpdatedBlog = blogs.filter(blg => blg.id !== blog.id )
    // const newList = [...listWhitoutTheUpdatedBlog, blogObj]

    const newList = blogs;
    const indexOfElementToReplace = newList.findIndex((blg) => blg.id === blog.id);
    newList.splice(indexOfElementToReplace, 1, blogObj);
    setBlogs([...newList]);
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
              {' '}
              {blog.author}
              {' '}
              <button onClick={toggleVisibility}>View</button>
            </p>
          </div>
        )
        : (
          <div style={blogStyle}>
            <p>
              {blog.title}
              {' '}
              <button onClick={toggleVisibility}>hide</button>
            </p>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              {' '}
              <button onClick={updateLikes}>like</button>
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
