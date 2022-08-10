import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import { Message } from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([])
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
      setMessage(['message', `User ${loggedUser.username} logged in`])
      setTimeout(() => {
        setMessage([])
      }, 5000)      
      setPassword('')
      setUsername('')

    } catch (error) {
      setMessage(['error', 'Invalid credentials'])
      setTimeout(() => {
        setMessage([])
      }, 5000)
      console.error('error')
    }
  }

  const handleLogout = async(event) =>{
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async(blogObj) =>{
    try {
      await blogService.postBlog(blogObj)
      await blogService.getAll(user).then(blogs =>
        setBlogs( blogs )
      )
      setMessage(['message', `A new blog ${blogObj.title} by ${blogObj.author} added`])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    } catch (error) {
      setMessage(['error', `Invalid creation, fields required missing`])
      setTimeout(() => {
        setMessage([])
      }, 5000)
      console.error(error)
    }
  }

  return (
    <div>
      {!user ?
      <div>
        <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        username={username}
        password={password}
        />
      <Message
      type={message[0]}
      message={message[1]}
      />
      </div>
      :
      <div>
      <h2>Blogs</h2>
      <Message
      type={message[0]}
      message={message[1]}
      />
      <p>{user.name} logged in <button onClick={e=>handleLogout(e)}>Log out</button></p>

      <Togglable buttonLabel='New note'>
        <CreateBlog
        postBlog={createBlog}
        />
      </Togglable>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }
    </div>
  )
}

export default App
