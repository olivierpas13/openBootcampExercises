import { useEffect, useState } from 'react';
import  Button  from '@mui/material/Button';
import { setBlogs } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Filter = () => {

  const [descendingOrder, setDescendingOrder] = useState(true);

  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {

    if(blogs.length === 0){return;}

    if(descendingOrder === true)
    {const newList1 = blogs.slice().sort((a, b) => b.likes-a.likes);
      dispatch(setBlogs([...newList1]));}
    if(descendingOrder === false)
    {const newList2 = blogs.slice().sort((a, b) => a.likes-b.likes);
      dispatch(setBlogs([...newList2]));}
  }, [descendingOrder]);


  const changeOrder = (e) => {
    e.preventDefault();
    setDescendingOrder(!descendingOrder);
  };

  return(
    <div>
      <h3>Sort blogs by likes</h3>
      {descendingOrder?
        <>
          <p>Descending order</p>
          <Button variant='outlined' color='primary' onClick={e => changeOrder(e)}>Switch order</Button>
        </>
        :
        <>
          <p>Ascending order</p>
          <Button variant='outlined' color='primary' onClick={e => changeOrder(e)}>Switch order</Button>
          <br/>
        </>
      }
    </div>
  );
};

export default Filter;