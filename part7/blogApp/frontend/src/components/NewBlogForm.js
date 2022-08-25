import { useDispatch, useSelector } from 'react-redux';
import { createNewBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import  TextField  from '@mui/material/TextField';


import  Button  from '@mui/material/Button';

const NewBlogForm = () => {

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();
  const { loggedUser } = useSelector(state => state.user);

  const createBlog = async(blogObj) => {
    try {
      if(!loggedUser){
        return dispatch(setNotification({
          message: 'Invalid creation, login first',
          type: 'error'
        }, 5));
      }
      await dispatch(createNewBlog(blogObj));

      dispatch(setNotification({
        message: `A new blog ${blogObj.title} by ${blogObj.author} added`,
        type: 'success'
      }, 5));
    } catch (rejectedValueOrSerializedError) {
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
      author: author.value,
      title: title.value,
      url: url.value
    };

    createBlog(blogToAdd);
  };

  return(
    <div>
      <h2>Create new</h2>
      <form>
        <TextField
          label='Author'
          {...author}
          placeholder='Author'
        />
        <br/>
        <br/>
        <TextField
          label='Title'
          {...title}
          placeholder='Title'
        />
        <br/>
        <br/>
        <TextField
          label='Url'
          {...url}
          placeholder='URL'
        />
        <br/>
        <br/>
      </form>
      <Button variant='outlined' color='secondary' onClick={e => addBlog(e)}>create</Button>
    </div>
  );
};
export default NewBlogForm;