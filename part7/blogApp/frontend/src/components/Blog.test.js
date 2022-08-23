import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: '123.com',
  likes: 3,
  user: {
    username: 'testuser',
  },
};

test('component displaying a blog renders only the blog\'s title and author', () => {
  const component = render(<Blog blog={blog} />);

  component.getByText(blog.title);
  component.getByText(blog.author);
  expect(component.queryByText(blog.url)).toBeNull();
  expect(component.queryByText(blog.likes)).toBeNull();
});

test('blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const component = render(<Blog blog={blog} />);

  const button = component.getByText('View');

  fireEvent.click(button);

  component.getByText(blog.title);
  component.getByText(blog.author);
  component.getByText(blog.url);
  component.getByText(blog.likes);

  expect(button).toBeDefined();
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} likeBlog={mockHandler} />);

  const button = component.getByText('View');

  fireEvent.click(button);

  const likeButton = component.getByText('Like');

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
