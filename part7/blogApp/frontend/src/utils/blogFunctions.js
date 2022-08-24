// import blogService from '../services/blogs';

// const likeBlog = async (blog, blogs, setBlogs) => {
//   const blogObj = {
//     ...blog,
//     likes: blog.likes + 1,
//   };
//   await blogService.updateBlog(blogObj);

//   // Another way

//   // const listWhitoutTheUpdatedBlog = blogs.filter(blg => blg.id !== blog.id )
//   // const newList = [...listWhitoutTheUpdatedBlog, blogObj]

//   const newList = blogs;
//   const indexOfElementToReplace = newList.findIndex((blg) => blg.id === blog.id);
//   newList.splice(indexOfElementToReplace, 1, blogObj);
//   setBlogs([...newList]);
// };

// const blogFunctions = {
//   // addBlog,
//   likeBlog
// };

// export default blogFunctions;