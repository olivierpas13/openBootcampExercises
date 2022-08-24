import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const { users } = useSelector(state => state.user);

  console.log(users.map(user => user.blogs));

  return(
    <>
      <h1>Users</h1>
      <table>
        <tr>
          <th>Usernames</th>
          <th>Blogs created</th>
        </tr>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`} >
                {user.username}
              </Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        ))
        }
      </table>
    </>
  );
};

export default Users;