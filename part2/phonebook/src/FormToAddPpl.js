import { useEffect, useState } from "react";
import { Persons } from "./Persons";
import { createNewPerson } from "./services/persons/createNewPerson";
import { getAllPersons } from "./services/persons/getAllPersons";
import { updatePerson } from "./services/persons/updatePerson";

export const FormToAddPpl = ({
  setNewName,
  newName,
  setPersons,
  persons,
  setNewNumber,
  newNumber,
  filteredNames,
  setFilteredNames,
  setCreateEvent,
  setUpdateEvent,
  setShowElement,
  setErrorEvent,
}) => {
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
    setUpdated(false);
  }, [setPersons, setUpdated, updated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let names = persons.map((person) => person.name);
    if (names.includes(newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to Phonebook, replace the old number with the new one?`
        )
      ) {
        const selected = persons.filter(
          (person) => person.name === newPerson.name
        );
        const selectedObj = { ...selected };
        updatePerson(selectedObj[0].id, newPerson.number).catch((error) => {
          setCreateEvent(false);
          setUpdateEvent(false);
          setErrorEvent(true);
          setShowElement(true);
        });
        setNewName(selectedObj[0].name);
        setNewNumber("");
        setErrorEvent(false);
        setCreateEvent(false);
        setUpdateEvent(true);
        setUpdated(true);
        setShowElement(true);
        return;
      }
    }
    createNewPerson(newPerson).then((person) => {
      setPersons((prevPerson) => prevPerson.concat(person));
    });
    setUpdateEvent(false);
    setErrorEvent(false);
    setCreateEvent(true);
    setShowElement(true);

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
