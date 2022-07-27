import { useState } from "react";
import { FormToAddPpl } from "./FormToAddPpl";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phones, setPhones] = useState("");
  const [newPhone, setNewPhone] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <FormToAddPpl
        setNewName={setNewName}
        newName={newName}
        setNewPhone={setNewPhone}
        newPhone={newPhone}
        setPersons={setPersons}
        persons={persons}
        setPhones={setPhones}
        phones={phones}
      />
    </div>
  );
};

export default App;
