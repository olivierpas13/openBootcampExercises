import { useEffect} from "react";
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
  setMessage,
  setShowElement,
  message
}) => {
  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, [setPersons, message]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let names = persons.map((person) => person.name);
    // if(!newPerson){
    //   alert("ola?")
    //   return;
    // }
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
        updatePerson(selectedObj[0].id, newPerson.number).catch((err) => {
          if(err.response.data.error.includes("Validation")){
          setMessage([err.response.data.error, 'error'])
          return;
          }
          setMessage([`Information of ${newName} has already been removed from server`, 'error']);
          setShowElement(true);
        });
        setMessage([`Updated ${selectedObj[0].name}`, 'message'])
        setNewNumber("");
        setNewName("");
        setShowElement(true);
        return;
      }
    }
    createNewPerson(newPerson).then((person) => {
      setPersons((prevPerson) => prevPerson.concat(person));
    }).catch(err=> (setMessage([err.response.data.error, 'error'])));
    setMessage([`Added ${newPerson.name}`, 'message'])
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
