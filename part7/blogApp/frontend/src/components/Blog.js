
const Blog =({
  blog,
}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };
  return (

    <div style={blogStyle}>
      <h3>
        {blog.title}
      </h3>
    </div>
  );
};

export default Blog;
