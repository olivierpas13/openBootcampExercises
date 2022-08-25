import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMatch,
  Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BlogContainer } from './styles/General';

import  AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Home from './components/Home';
import Blogs from './components/Blogs';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Filter from './components/Filter';
import { Message } from './components/Message';
import OneBlog from './components/OneBlog';
import User from './components/User';


import { initializeBlogs } from './reducers/blogReducer';
import { login } from './reducers/userReducer';

import blogService from './services/blogs';

const App = () => {

  const dispatch = useDispatch();
  const blogs =  useSelector(state => state.blogs);
  const { loggedUser } = useSelector(state => state.user);
  const { users } = useSelector(state => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);


  useEffect(() => {
    dispatch(initializeBlogs());
  }, [loggedUser]);

  const handleLogout = async(event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(login(null));
  };

  const blogMatch = useMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find(blog => (blog.id) === (blogMatch.params.id))
    : null;

  const userMatch = useMatch('/users/:id');
  const user = userMatch
    ? users.find(user => user.id === (userMatch.params.id))
    :null;

  return (
    <BlogContainer>
      <AppBar position='fixed' >
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' />
          <Button color='inherit' component={Link} to='/'> Home </Button>
          <Button color='inherit' component={Link} to='/blogs'> Blogs </Button>
          <Button color='inherit' component={Link} to='/users'> Home </Button>
          {
            loggedUser
              ? <em>{loggedUser.username} logged in <button onClick={(e) => {handleLogout(e);}}>Logout</button></em>
              :<Button color='inherit' component={Link} to='/login'> Login </Button>
          }
        </Toolbar>
      </AppBar>
      <h1>Blog App</h1>
      <Message/>
      <Filter/>

      <Routes>
        <Route path='/users/:id' element={user? <User user={user} />: <Navigate replace to={'/'}/> }/>
        <Route path='/blogs/:id' element={blog? <OneBlog blog={blog} loggedUser={loggedUser} />: <Navigate replace to={'/'}/> }/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/users' element={<Users/>} />
        <Route path='/login' element={ loggedUser? <Navigate replace to={'/'} /> : <LoginForm/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </BlogContainer>
  );
};

export default App;
