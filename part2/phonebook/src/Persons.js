import { deletePerson } from "./services/persons/deletePerson";
import { useEffect, useState } from "react";
import { getAllPersons } from "./services/persons/getAllPersons";

export const Persons = ({
  persons,
  filteredNames,
  setPersons,
  setFilteredNames,
}) => {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
    setDeleted(false);
  }, [setPersons, deleted, setDeleted]);

  const handleDelete = (e) => {
    const id = e.target.id.split(",", 2);
    if (window.confirm(`Delete ${id[1]} ?`)) {
      setDeleted(true);
      deletePerson(id[0]);
      getAllPersons().then((persons) => setFilteredNames(persons));
      getAllPersons().then((persons) => setPersons(persons));
    }
  };

  console.log(deleted);
  return filteredNames.length > 0
    ? filteredNames.map((person) => (
        <div>
          <p key={person.id}>
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
        <div>
          <p key={person.id}>
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
