import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const Message = () => {

  const notification = useSelector(state => state.notification);

  return (
    <div className= {notification.type} >
      {' '}
      {notification.message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
