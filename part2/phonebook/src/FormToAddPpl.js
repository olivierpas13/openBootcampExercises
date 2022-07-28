export const FormToAddPpl = ({
  setNewName,
  newName,
  setPersons,
  persons,
  setNewNumber,
  newNumber,
  filteredNames,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newId = persons.length + 1;
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newId,
    };

    let names = persons.map((person) => person.name);

    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to Phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons([...persons].concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <p>
            name: <input value={newName} onChange={handleChangeName} />
            <br />
            number: <input value={newNumber} onChange={handleChangeNumber} />
          </p>
        </div>
        <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredNames.length > 0
        ? filteredNames.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};
