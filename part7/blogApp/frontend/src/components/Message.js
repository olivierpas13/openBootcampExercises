import PropTypes from 'prop-types';

export const Message = ({ message, type }) => (
  <div className={type}>
    {' '}
    {message}
  </div>
);

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
