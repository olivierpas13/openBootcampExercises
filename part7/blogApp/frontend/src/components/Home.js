import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';
import Blogs from './Blogs';

const Home = () => {
  return(
    <div>
      <h1>Blog App</h1>
      <Togglable buttonLabel={'Create new'}>
        <NewBlogForm/>
      </Togglable>
      <Blogs/>
    </div>
  );
};

export default Home;