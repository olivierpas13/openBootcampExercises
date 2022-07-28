import { useState, useEffect } from "react";
import { FormToAddPpl } from "./FormToAddPpl";
import { Filter } from "./Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const { data } = response;
      setPersons(data);
    });
  }, []);

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
