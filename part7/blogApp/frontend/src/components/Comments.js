import { useField } from '../hooks';
const Comments = ({ comments }) => {

  const commentInput = useField('text');

  return(
    <div>
      <h3>Comments</h3>
      <form>
        <input {...commentInput} />
        <button></button>
      </form>
      {
        comments.map(comment => <li key={comment} >{comment}</li>)
      }
    </div>
  );
};

export default Comments;