import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import { Message } from './components/Message';
import blogFunctions from './utils/blogFunctions';
import Filter from './components/Filter';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blgs) => setBlogs(blgs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(userLogged.token);
    }
  }, []);

  /* eslint-disable*/
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });

      setUser(loggedUser);

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);
      setMessage(['message', `User ${loggedUser.username} logged in`]);
      setTimeout(() => {
        setMessage([]);
      }, 5000);
      setPassword('');
      setUsername('');
    } catch (error) {
      setMessage(['error', 'Invalid credentials']);
      setTimeout(() => {
        setMessage([]);
      }, 5000);
      return ('error');
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };
  const createBlog = async (blogObj) => {
    try {
      await blogService.postBlog(blogObj);
      await blogService.getAll(user).then((blgs) => setBlogs(blgs));
      setMessage(['message', `A new blog ${blogObj.title} by ${blogObj.author} added`]);
      setTimeout(() => {
        setMessage([]);
      }, 5000);
    } catch (error) {
      setMessage(['error', 'Invalid creation, fields required missing']);
      setTimeout(() => {
        setMessage([]);
      }, 5000);
      return (error);
    }
  };

  /* eslint-enable */

  return (
    <div>
      {!user
        ? (
          <div>
            <LoginForm
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
              username={username}
              password={password}
            />
            <Message
              type={message[0]}
              message={message[1]}
            />
          </div>
        )
        : (
          <div>
            <h2>Blogs</h2>
            <Message
              type={message[0]}
              message={message[1]}
            />
            <p>
              {user.name}
              {' '}
              logged in
              {' '}
              <button type="button" onClick={(e) => handleLogout(e)}>Log out</button>
            </p>

            <Togglable buttonLabel="Create blog">
              <NewBlogForm
                postBlog={createBlog}
              />
            </Togglable>
            <br />
            <Filter
              blogs={blogs}
              setBlogs={setBlogs}
            />
            {blogs.map((blog) => (
              <Blog
                likeBlog={blogFunctions.likeBlog}
                loggedUser={user.username}
                setBlogs={setBlogs}
                key={blog.id}
                blog={blog}
                blogs={blogs}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default App;
