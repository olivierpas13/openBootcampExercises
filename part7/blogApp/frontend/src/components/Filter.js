import { useEffect, useState } from 'react';

const Filter = ({ blogs, setBlogs }) => {
  const [descendingOrder, setDescendingOrder] = useState(true);

  useEffect(() => {
    if (descendingOrder === true) {
      const newList1 = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs([...newList1]);
    }
    if (descendingOrder === false) {
      const newList2 = blogs.sort((a, b) => a.likes - b.likes);
      setBlogs([...newList2]);
    }
  }, [descendingOrder]);

  const changeOrder = (e) => {
    e.preventDefault();
    setDescendingOrder(!descendingOrder);
  };

  return (
    <div>
      <h3>Sort blogs by likes</h3>
      {descendingOrder
        ? (
          <button type="button" className="descending-order-button" onClick={(e) => changeOrder(e)}>Ascending order</button>
        )
        : (
          <>
            <button type="button" onClick={(e) => changeOrder(e)}>Descending order</button>
            <br />
          </>
        )}
    </div>
  );
};

export default Filter;
