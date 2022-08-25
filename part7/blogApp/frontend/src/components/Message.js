import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

export const Message = () => {

  const notification = useSelector(state => state.notification);

  return (
    <div>
      {
        notification ?
          <Alert severity={notification.type} >
            {notification.message}
          </Alert>
          : null
      }
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
