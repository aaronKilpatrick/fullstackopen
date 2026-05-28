import { useState, useEffect } from 'react';
import personServices from './services/persons';
import Filter from './components/Filter';
import Notification from './services/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    className: 'success',
  });

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = () => {
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    const updateMessage = `${newName} is already added to the phonebook, replace the old number with the new one?`;

    if (window.confirm(updateMessage)) {
      personServices
        .update(existingPerson.id, {
          ...existingPerson,
          number: newNumber,
        })
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
          );
        })
        .catch(() => {
          setNotification({
            message: `${existingPerson.name} has already been deleted`,
            className: 'error',
          });
          setTimeout(() => {
            setNotification({ ...notification, message: null });
          }, 3000);
          setPersons(persons.filter((p) => existingPerson.id !== p.id));
        });
    }
  };

  const addEntry = (e) => {
    e.preventDefault();
    const newObject = { name: newName, number: newNumber };

    const isDuplicateEntry = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (!isDuplicateEntry) {
      personServices.create(newObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotification({
          message: `Added: ${returnedPerson.name}`,
          className: 'success',
        });
        setTimeout(() => {
          setNotification({ ...notification, message: null });
        }, 3000);
        setNewName('');
        setNewNumber('');
      });
      return;
    }

    updatePerson();
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personServices
        .deleteEntry(person.id)
        .then((deletedPerson) => {
          setPersons(persons.filter((p) => p.id !== deletedPerson.id));
        })
        .catch((error) => {
          console.log(error.response.status);
          alert(`${person.name} has already been deleted`);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
  };

  const personsToShow = searchQuery
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
        <Persons persons={personsToShow} onClick={handleDelete} />
      </div>
    </div>
  );
};

export default App;
