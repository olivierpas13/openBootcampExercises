import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const getOne = (id) =>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const postBlog = async (blogObj) =>{
    const config = {
      headers: { Authorization: token },
    }
    await axios.post(baseUrl, blogObj, config)
}

const updateBlog = async (blogObj)=>{
  const config = {
    headers: { Authorization: token },
  }

  await axios.put(`${baseUrl}/${blogObj.id}`, blogObj, config)

}

const blogService={
  getOne,
  updateBlog,
  setToken,
  getAll,
  postBlog,
}

export default blogService