import { useState } from "react";
import { FormToAddPpl } from "./FormToAddPpl";
import { Filter } from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "ol", number: "040-123456", id: 5 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
