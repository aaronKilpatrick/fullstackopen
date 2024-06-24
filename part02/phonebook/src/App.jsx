import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import ContactListing from './components/ContactList';
import Filter from './components/Filter';
import Heading from './components/Heading';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPeople(response.data);
        setFilteredPeople(response.data);
      });
  }, []);
  
  const checkUniqueName = () => {
    return people.find((person) => person.name === newName);
  };

  const validatePhoneNumber = () => {
    return newNumber.length === 10 && !isNaN(parseInt(newNumber));
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (checkUniqueName())
      return alert(`${newName} is already added to phonebook`);

    if (!validatePhoneNumber())
      return alert(`${newNumber} is not a valid phone number`);

    setPeople(
      people.concat({
        name: newName,
        number: newNumber,
        id: people.length + 1,
      }),
    );
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

    const regex = new RegExp(filter, 'i');
    setFilteredPeople(() => people.filter(person => person.name.match(regex)));
  };

  return (
    <div>
      <Heading heading="Phonebook" />
      <div>
        <Filter handleFilterChange={handleFilterChange} />
      </div>
      <div>
        <Heading heading="add a new contact" />
        <PersonForm
          addNewPerson={addNewPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <div>
        <Heading heading="Numbers" />
        <ContactListing list={filteredPeople} />
      </div>
    </div>
  );
};

export default App;
