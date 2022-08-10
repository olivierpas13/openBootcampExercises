import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = (user) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

// const postBlog = async (author, url, title) =>{
const postBlog = async (blogObj) =>{
    const config = {
      headers: { Authorization: token },
    }
  
    // const newBlog = {
    //   title: blogObj.title,
    //   author: blogObj.author,
    //   url: blogObj.url,
    // }
    await axios.post(baseUrl, blogObj, config)
    // console.log(response)
}

const blogService={
  setToken,
  getAll,
  postBlog,
}

export default blogService