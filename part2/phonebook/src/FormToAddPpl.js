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
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let names = persons.map((person) => person.name);
    // console.log(names);

    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to Phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons(persons.concat(newPerson));
    // setNumbers(Numbers.concat(newNumber));
    setNewName("");
    setNewNumber("");
    // alert({ message });
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
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
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredNames.map((person, index) => (
        <p key={index}>
          {/* {person.name} {person.number} */}
          {person}
        </p>
      ))}
    </div>
  );
};
