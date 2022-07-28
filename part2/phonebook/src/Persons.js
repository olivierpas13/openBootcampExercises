export const Persons = ({ persons, filteredNames }) => {
  return filteredNames.length > 0
    ? filteredNames.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))
    : persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ));
};
