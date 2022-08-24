import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {

  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
};

const getOne = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(`${baseUrl}/${id}`, config);
  return request.then(response => response.data);
};

const postBlog = async (blogObj) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, blogObj, config);
    return response.data;
  } catch (error) {
    console.log('response');
    return error;
  }
};

const updateBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.put(`${baseUrl}/${blogObj.id}`, blogObj, config);

};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then(response => response.data);
};

const blogService={
  getOne,
  updateBlog,
  setToken,
  getAll,
  postBlog,
  deleteBlog
};

export default blogService;