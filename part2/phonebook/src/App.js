import { useState, useEffect } from "react";
import { FormToAddPpl } from "./FormToAddPpl";
import { Filter } from "./Filter";
import { Message } from "./Message";
import { getAllPersons } from "./services/persons/getAllPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [createEvent, setCreateEvent] = useState(false);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [errorEvent, setErrorEvent] = useState(false);
  const [showElement, setShowElement] = useState(true);

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(false);
    }, 3500);
  }, [showElement]);

  console.log(errorEvent);
  return (
    <div>
      <h2>Phonebook</h2>
      {showElement ? (
        <Message
          person={persons[persons.length - 1]}
          newName={newName}
          createEvent={createEvent}
          updateEvent={updateEvent}
          errorEvent={errorEvent}
          setCreateEvent={setCreateEvent}
          setUpdateEvent={setUpdateEvent}
          setErrorEvent={setErrorEvent}
        />
      ) : (
        <div></div>
      )}
      <Filter
        setFilteredNames={setFilteredNames}
        filteredNames={filteredNames}
        persons={persons}
      />
      <h2>Add a new</h2>
      <FormToAddPpl
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        persons={persons}
        setPersons={setPersons}
        filteredNames={filteredNames}
        setFilteredNames={setFilteredNames}
        setCreateEvent={setCreateEvent}
        setUpdateEvent={setUpdateEvent}
        setErrorEvent={setErrorEvent}
        setShowElement={setShowElement}
      />
    </div>
  );
};

export default App;
