export const Filter = ({
  filtro,
  setFilter,
  names,
  setPersons,
  persons,
  filteredNames,
  testFilter,
  setTestFilter,
  setFilteredNames,
}) => {
  const searchInPersons = (searchString, persons) => {
    const results = persons.map((person) => {
      console.log(person?.name?.match(searchString));
      return person?.name?.match(searchString)?.input;
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
