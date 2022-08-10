import { useState } from 'react';

// const Togglable = ({children ,buttonLabel}) =>{
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
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <p><button onClick={toggleVisibility}>Cancel</button></p>
      </div>
    </div>
  );
};

export default Togglable;