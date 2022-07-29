import { Persons } from "./Persons";
import { createNewPerson } from "./services/persons/createNewPerson";

export const FormToAddPpl = ({
  setNewName,
  newName,
  setPersons,
  persons,
  setNewNumber,
  newNumber,
  filteredNames,
  setFilteredNames,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let names = persons.map((person) => person.name);

    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to Phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    createNewPerson(newPerson).then((person) => {
      setPersons((prevPerson) => prevPerson.concat(person));
    });
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
      <Persons
        setFilteredNames={setFilteredNames}
        persons={persons}
        filteredNames={filteredNames}
        setPersons={setPersons}
      />
    </div>
  );
};
