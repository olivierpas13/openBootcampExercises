import { deletePerson } from "./services/persons/deletePerson";
import { useEffect, useState } from "react";
import { getAllPersons } from "./services/persons/getAllPersons";

export const Persons = ({
  persons,
  filteredNames,
  setPersons,
  setFilteredNames,
  message
}) => {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
    setDeleted(false);
  }, [setPersons, deleted, setDeleted, message]);

  const handleDelete = (e) => {
    const id = e.target.id.split(",", 2);
    if (window.confirm(`Delete ${id[1]} ?`)) {
      setDeleted(true);
      deletePerson(id[0]);
      // getAllPersons().then((persons) => setFilteredNames(persons));
      // getAllPersons().then((persons) => setPersons(persons));
    }
  };
  return filteredNames.length > 0
    ? filteredNames.map((person) => (
        <div key={person.id}>
          <p >
            {person.name} {person.number}
            <button
              id={[person.id, person.name]}
              onClick={(e) => handleDelete(e)}
            >
              delete
            </button>
          </p>
        </div>
      ))
    : persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
            <button
              id={[person.id, person.name]}
              onClick={(e) => handleDelete(e)}
            >
              delete
            </button>
          </p>
        </div>
      ));
};
