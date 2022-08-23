import { useState } from 'react';

const NewBlogForm = ({ postBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();

    const blogToAdd = {
      author,
      title,
      url,
    };

    // postBlog(author, title, url)
    postBlog(blogToAdd);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form>
        Author:
        {' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <br />
        <br />
        Title:
        {' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <br />
        <br />
        URL:
        {' '}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <br />
        <br />
      </form>
      <button type="submit" onClick={(e) => addBlog(e)}>create</button>
    </div>
  );
};
export default NewBlogForm;
