import { useState } from "react"

const Blog = ({blog}) => {

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

const [visibility, setvisibility] = useState(true)

const toggleVisibility = () =>{
  setvisibility(!visibility)
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
        {/* {blog.title} <button onClick={toggleVisibility}>hide</button>
        {blog.url}
        {blog.likes} <button>like</button>
        {blog.author} */}
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>
    }
</div>
)
}

export default Blog