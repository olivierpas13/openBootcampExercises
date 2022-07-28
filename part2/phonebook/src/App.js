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
  const [filtro, setFilter] = useState("");
  const [testFilter, setTestFilter] = useState("");
  // console.log(filteredNames);
  const [filteredNames, setFilteredNames] = useState([]);
  // console.log(filteredNames);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        setFilteredNames={setFilteredNames}
        // filtro={filtro}
        // setFilter={setFilter}
        // names={persons.map((person) => person.name)}
        // setPersons={setPersons}
        persons={persons}
        // testFilter={testFilter}
        // setTestFilter={setTestFilter}
      />
      <h2>Add a new</h2>
      <FormToAddPpl
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        setPersons={setPersons}
        filteredNames={filteredNames}
      />
    </div>
  );
};

export default App;
