import { useEffect } from 'react';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import { useDispatch } from 'react-redux';
import { initalizeBlogs } from './reducers/blogReducer';
import { useMatch,
  Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from './reducers/userReducer';
import OneBlog from './components/OneBlog';

const App = () => {
  const dispatch = useDispatch();
  const blogs =  useSelector(state => state.blogs);
  const { loggedUser } = useSelector(state => state.user);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);


  useEffect(() => {
    dispatch(initalizeBlogs());
  }, [loggedUser]);

  const handleLogout = async(event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(login(null));
  };

  const padding = {
    padding: 5
  };

  console.log(blogs.find(blog => blog.id === '62f6b34258c09fcace0dc568'));
  const match = useMatch('/blogs/:id');
  const blog = match
    ? blogs.find(blog => (blog.id) === (match.params.id))
    : null;

  return (
    <>
      <div>
        <Link style={padding} to='/'>
        Home
        </Link>
        <Link style={padding} to='/blogs'>
        Blogs
        </Link>
        <Link style={padding} to='/users'>
        Users
        </Link>
        {
          loggedUser
            ? <em>{loggedUser.username} logged in <button onClick={(e) => {handleLogout(e);}}>Logout</button></em>
            :<Link style={padding} to='/login'> Login </Link>
        }
        <h1>Blog App</h1>
      </div>

      <Routes>
        <Route path='/blogs/:id' element={blog? <OneBlog blog={blog} loggedUser={loggedUser} />: <Navigate replace to={'/'}/> }/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/users' element={<Users/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </>    // <div>
    //   {!user ?
    //     <div>
    //       <LoginForm
    //         setUsername={setUsername}
    //         setPassword={setPassword}
    //         handleLogin={handleLogin}
    //         username={username}
    //         password={password}
    //       />
    //       <Message
    //       />
    //     </div>
    //     :
    //     <div>
    //       <h2>Blogs</h2>
    //       <Message
    //       />
    //       <p>{user.name} logged in <button onClick={e => handleLogout(e)}>Log out</button></p>

  //       <Togglable buttonLabel='Create blog'>
  //         <NewBlogForm
  //            postBlog={createBlog}
  //         />
  //       </Togglable>
  //       <br/>
  //       {/* <Filter
  //         blogs={blogs}
  //         // setBlogs={setBlogs}
  // //       /> */}
  //       {blogs.map(blog =>
  //         <Blog
  //           likeBlog = {blogFunctions.likeBlog}
  //           loggedUser={user.username}
  //           // setBlogs={setBlogs}
  //           key={blog.id}
  //           blog={blog}
  //           blogs={blogs}/>
  //       )}
  //     </div>
  //   }
  // </div>
  );
};

export default App;
