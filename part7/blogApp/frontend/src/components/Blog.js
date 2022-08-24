import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOneBlog, voteForBlog } from '../reducers/blogReducer';
// import blogService from '../services/blogs';

const Blog =({
  blog, loggedUser
}) => {
  const [visibility, setVisibility] = useState(true);

  const dispatch = useDispatch();

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

  const likeBlog = (id, e) => {
    e.preventDefault();
    dispatch(voteForBlog(id));
  };

  const removeBlog = async (e) => {
    e.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteOneBlog(blog.id));
      // await blogService.deleteBlog(blog.id);
      // const newList = blogs.filter((blg) => blg.id !== blog.id);
      // setBlogs([...newList]);
    }
  };

  return (

    <div>
      {visibility
        ? (
          <div className='blog' style={blogStyle}>
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
          <div className='blog' style={blogStyle}>
            <p>
              {blog.title}
              {' '}
              <button onClick={toggleVisibility}>Hide</button>
            </p>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              {' '}
              <button className='likeButton' onClick={(e) => likeBlog(blog.id, e)}>Like</button>
            </p>
            <p>{blog.author}</p>
            {(blog.user.username === loggedUser)
              // ? <button onClick={(e) => (e)}>Delete</button>
              ? <button onClick={(e) => removeBlog(e)}>Delete</button>
              : <></>}
          </div>
        )}
    </div>
  );
};

export default Blog;
