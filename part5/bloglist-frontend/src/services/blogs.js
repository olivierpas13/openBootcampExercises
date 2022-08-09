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

const postBlog = async (author, url, title) =>{
    const config = {
      headers: { Authorization: token },
    }
  
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    await axios.post(baseUrl, newBlog, config)
    // console.log(response)
}

export default { getAll, setToken, postBlog }