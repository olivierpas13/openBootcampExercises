import { useState, useEffect } from "react";
import { FormToAddPpl } from "./FormToAddPpl";
import { Filter } from "./Filter";
import { getAllPersons } from "./services/persons/getAllPersons";
import { MessageToRender } from "./MessageToRender";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [message, setMessage] = useState([]);
  const [showElement, setShowElement] = useState(true);

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(false);
      setMessage([])
    }, 3500);
  }, [showElement]);

  return (
    <div>
      <h2>Phonebook</h2>
      {showElement ? (
        <MessageToRender
        message={message[0]}
        type={message[1]}
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
        setMessage={setMessage}
        message={message}
        setShowElement={setShowElement}
      />
    </div>
  );
};

export default App;
