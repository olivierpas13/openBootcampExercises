import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import { Message } from './components/Message';
import blogFunctions from './utils/blogFunctions';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { createNewBlog, initalizeBlogs } from './reducers/blogReducer';
import { useSelector } from 'react-redux';
import { login } from './reducers/userReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogs =  useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      // setUser(user);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);


  useEffect(() => {
    dispatch(initalizeBlogs());
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username,
        password
      });

      dispatch(login(loggedUser)
      );
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(loggedUser)
      );

      blogService.setToken(loggedUser.token);
      dispatch(setNotification({
        message: `User ${loggedUser.username} logged in`,
        type: 'message'
      }, 5));
      setPassword('');
      setUsername('');

    } catch (error) {
      dispatch(setNotification({
        message:  'Invalid credentials',
        type: 'error'
      }, 5));
      console.error('error');
    }
  };

  const handleLogout = async(event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(login(null));
  };

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


  return (
    <div>
      {!user ?
        <div>
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
          <Message
          />
        </div>
        :
        <div>
          <h2>Blogs</h2>
          <Message
          />
          <p>{user.name} logged in <button onClick={e => handleLogout(e)}>Log out</button></p>

          <Togglable buttonLabel='Create blog'>
            <NewBlogForm
              postBlog={createBlog}
            />
          </Togglable>
          <br/>
          {/* <Filter
            blogs={blogs}
            // setBlogs={setBlogs}
          /> */}
          {blogs.map(blog =>
            <Blog
              likeBlog = {blogFunctions.likeBlog}
              loggedUser={user.username}
              // setBlogs={setBlogs}
              key={blog.id}
              blog={blog}
              blogs={blogs}
            />
          )}
        </div>
      }
    </div>
  );
};

export default App;
