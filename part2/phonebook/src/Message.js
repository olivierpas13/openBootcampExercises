export const Message = ({
  createEvent,
  updateEvent,
  person,
  newName,
  errorEvent,
}) => {
  if (errorEvent === true) {
    return (
      <div className="error">{`Information of ${newName} has already been removed from server`}</div>
    );
  }
  if (createEvent === true) {
    return <div className="message">{`Added ${person.name}`}</div>;
  }
  if (updateEvent === true) {
    return <div className="message">{`Updated ${newName}`}</div>;
  }
  return null;
};
