import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0433777999" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addEntry = (e) => {
    e.preventDefault();

    const isDuplicateEntry = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (isDuplicateEntry) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const personsToShow = searchQuery
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchQuery} onChange={handleSearchQuery} />
      <div>
        <h3>Add a new person</h3>
        <PersonForm
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}
          onClick={addEntry}
        />
      </div>
      <div>
        <h2>Numbers</h2>
        <Persons persons={personsToShow} />
      </div>
    </div>
  );
};

export default App;
