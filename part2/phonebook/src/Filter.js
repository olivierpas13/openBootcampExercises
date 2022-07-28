export const Filter = ({ persons, setFilteredNames }) => {
  const searchInPersons = (searchString, persons) => {
    const results = persons.filter((person) => {
      return !!person?.name?.toLowerCase().match(searchString.toLowerCase());
    });
    setFilteredNames(results.filter((result) => result));
  };

  const handleChangeFilter = (event) => {
    searchInPersons(event.target.value, persons);
  };
  return (
    <p>
      filter shown with <input onChange={handleChangeFilter} />
    </p>
  );
};
