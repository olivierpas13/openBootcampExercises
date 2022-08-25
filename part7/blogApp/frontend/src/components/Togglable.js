import { useState } from 'react';
import  Button  from '@mui/material/Button';

const Togglable = ({ children ,buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <p>
          <Button variant='outlined' color='primary' onClick={toggleVisibility}>{buttonLabel}</Button>
        </p>
      </div>
      <div style={showWhenVisible}>
        {children}
        <p><Button variant='outlined' color='primary' onClick={toggleVisibility}>Cancel</Button></p>
      </div>
    </div>
  );
};

export default Togglable;