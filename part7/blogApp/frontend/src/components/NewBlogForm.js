import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const NewBlogForm = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const createBlog = async(blogObj) => {
    try {
      await dispatch(createNewBlog(blogObj));

      dispatch(setNotification({
        message: `A new blog ${blogObj.title} by ${blogObj.author} added`,
        type: 'message'
      }, 5));
    } catch (rejectedValueOrSerializedError) {
      console.log('error en app');
      dispatch(setNotification({
        message: 'Invalid creation, fields required missing',
        type: 'error'
      }, 5));
      console.error(rejectedValueOrSerializedError);
    }
  };

  const addBlog = (e) => {
    e.preventDefault();

    const blogToAdd = {
      author: author,
      title: title,
      url: url
    };

    createBlog(blogToAdd);
    setTitle('');
    setAuthor('');
    setUrl('');

  };

  return(
    <div>
      <h2>Create new</h2>
      <form>
                Author: <input
          type="text"
          value={author}
          name='Author'
          onChange={e => setAuthor(e.target.value)}
          placeholder='Author'
        />
        <br/>
        <br/>
                Title: <input
          type="text"
          value={title}
          name='Title'
          onChange={e => setTitle(e.target.value)}
          placeholder='Title'
        />
        <br/>
        <br/>
                URL: <input
          type="text"
          value={url}
          name='Url'
          onChange={e => setUrl(e.target.value)}
          placeholder='URL'
        />
        <br/>
        <br/>
      </form>
      <button onClick={e => addBlog(e)}>create</button>
    </div>
  );
};
export default NewBlogForm;