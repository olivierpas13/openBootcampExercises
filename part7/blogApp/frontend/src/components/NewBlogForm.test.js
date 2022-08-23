import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: '123.com',
  likes: 3,
  user: {
    username: 'testuser',
  },
};

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const component = render(<NewBlogForm postBlog={createBlog} />);
  const authorInput = component.getByPlaceholderText('Author');
  const titleInput = component.getByPlaceholderText('Title');
  const urlInput = component.getByPlaceholderText('URL');
  const createButton = component.getByText('create');

  await user.type(authorInput, blog.author);
  await user.type(titleInput, blog.title);
  await user.type(urlInput, blog.url);
  await user.click(createButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
});
