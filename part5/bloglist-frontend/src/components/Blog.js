import { useState, useEffect } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, blogs,  setBlogs}) => {

const [visibility, setVisibility] = useState(true)
// const [updated, setUpdated] = useState(false)
// useEffect(()=>{
//   blogService.getAll().then(blogs =>
//     setBlogs( blogs )
//   )   
//   console.log('updated')
//   setUpdated(false)
// }, [setBlogs, updated])

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }


const toggleVisibility = () =>{
  setVisibility(!visibility)
}

const updateLikes = async () =>{
  const blogObj = {
    ...blog,
    likes: blog.likes + 1
  }
  await blogService.updateBlog(blogObj)

  // Another way

  // const listWhitoutTheUpdatedBlog = blogs.filter(blg => blg.id !== blog.id )
  // const newList = [...listWhitoutTheUpdatedBlog, blogObj]
  

  const newList = blogs
  const indexOfElementToReplace = newList.findIndex(blg => blg.id === blog.id )
  newList.splice(indexOfElementToReplace, 1,  blogObj)
  setBlogs([...newList])
}

return(

  <div>
    {visibility?
      <div style={blogStyle}>
        <p>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
        </p>
      </div>
  :
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={updateLikes}>like</button></p>
        <p>{blog.author}</p>
      </div>
    }
</div>
)
}

export default Blog