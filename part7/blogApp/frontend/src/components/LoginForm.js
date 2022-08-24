import { useState } from 'react';
import loginService from '../services/login';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
// import { setNotification } from '..notificationReducer/reducers/notificationReducer';


const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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

  return(
    <form>
      <p>Username</p>
      <input
        type="text"
        value={username}
        name= 'Username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <br/><br/>
      <p>Password</p>
      <input
        type="password"
        value={password}
        name= 'Password'
        onChange={(e) => setPassword(e.target.value)} />
      <br/><br/>
      <button  onClick={(e) => handleLogin(e)}>Login</button>
    </form>
  );
};

export default LoginForm;
