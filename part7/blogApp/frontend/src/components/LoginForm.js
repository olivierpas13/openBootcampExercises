import loginService from '../services/login';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import  TextField  from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { useField } from '../hooks';

const LoginForm = () => {

  const username = useField('text');
  const password = useField('password');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username: username.value,
        password : password.value
      });

      dispatch(login(loggedUser)
      );
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(loggedUser)
      );

      blogService.setToken(loggedUser.token);
      dispatch(setNotification({
        message: `User ${loggedUser.username} logged in`,
        type: 'success'
      }, 5));

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
      <TextField
        label= 'Username'
        {...username}
      />
      <p>Password</p>
      <TextField
        label= 'Password'
        {...password}
      />
      <br/><br/>
      <Button variant='outlined' color='secondary'  onClick={(e) => handleLogin(e)}>Login</Button>
    </form>
  );
};

export default LoginForm;
