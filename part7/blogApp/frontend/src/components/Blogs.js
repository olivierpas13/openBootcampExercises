import Blog from './Blog';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Blogs = () => {
  const blogs =  useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  return(
    <div>
      <h1>Blogs</h1>

      {blogs.map(blog => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <Blog
            loggedUser={user.username}
            blog={blog}
          />
        </Link>

      ))}
    </div>
  );
};

export default Blogs;