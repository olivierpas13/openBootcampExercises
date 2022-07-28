import { useState } from "react";
import { FormToAddPpl } from "./FormToAddPpl";
import { Filter } from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  );
};

export default App;
