import Blog from './Blog';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardGroup } from '../styles/Card';
import { Card } from '../styles/Card';

const Blogs = () => {
  const blogs =  useSelector(state => state.blogs);

  return(
    <div>
      <h1>Blogs</h1>

      <CardGroup>

        {blogs.map(blog => (
          <Card key={blog.id}>
            <Link to={`/blogs/${blog.id}`} >
              <Blog
                blog={blog}
              />
            </Link>

          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default Blogs;