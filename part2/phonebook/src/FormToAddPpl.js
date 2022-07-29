import axios from "axios";
import { Persons } from "./Persons";

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

    axios
      .post("http://localhost:3001/persons", newPerson)
      .then((response) => console.log(response));
    setPersons((prevPersons) => prevPersons.concat(newPerson));

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
      <Persons persons={persons} filteredNames={filteredNames} />
    </div>
  );
};
