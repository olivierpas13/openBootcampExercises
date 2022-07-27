export const FormToAddPpl = ({
  setNewName,
  newName,
  setPersons,
  persons,
  setNewPhone,
  newPhone,
  phones,
  setPhones,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone,
    };

    let names = persons.map((person) => person.name);
    console.log(names);

    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      setNewName("");
      setNewPhone("");
      return;
    }

    setPersons(persons.concat(newPerson));
    // setPhones(phones.concat(newPhone));
    setNewName("");
    setNewPhone("");
    // alert({ message });
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
          number: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};
