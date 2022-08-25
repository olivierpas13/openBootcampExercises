import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { commentBlog } from '../reducers/blogReducer';
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ comments, blogId }) => {

  const dispatch = useDispatch();

  const commentInput = useField('text');

  const addComment = (e) => {
    e.preventDefault();
    if(commentInput.value.length < 1){return;}
    dispatch(commentBlog(commentInput.value, blogId));
  };

  return(
    <div>
      <h3>Comments</h3>
      <form>
        <input {...commentInput} />
        <button onClick={(e) => addComment(e)}>Add comment</button>
      </form>
      <div>
        {
          comments.map(comment => <li key={uuidv4()} >{comment}</li>)
        }
      </div>
    </div>
  );
};

export default Comments;