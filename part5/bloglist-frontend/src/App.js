import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('this efect')
    blogService.getAll(user).then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)}
  }, [])

  const handleLogin = async (event) =>{
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username,
        password
      })

      setUser(loggedUser)
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
        ) 
        
        blogService.setToken(loggedUser.token)
      setPassword('')
      setUsername('')

    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async(event) =>{
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async(event) =>{
    event.preventDefault()

    try {
      console.log(author)
      await blogService.postBlog(author, url, title)
      await blogService.getAll(user).then(blogs =>
        setBlogs( blogs )
      )  
    } catch (error) {
      console.error(error)
    }
  }

  console.log(author)
  return (
    <div>
      {!user ?
      <LoginForm
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
      username={username}
      password={password}
      />:
      <div>
      <CreateBlog
      setAuthor={setAuthor}
      author={author}
      setTitle={setTitle}
      title={title}
      setUrl={setUrl}
      url={url}
      createBlog={createBlog}
      />
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={e=>handleLogout(e)}>Log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }
    </div>
  )
}

export default App
