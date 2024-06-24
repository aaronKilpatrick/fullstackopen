import { useState } from 'react';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');

  const checkUniqueName = () => {
    // returns undefined if no name. Leverage that with if statement (true or false)
    return person.find((person) => person.name === newName);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (checkUniqueName())
      return alert(`${newName} is already added to phonebook`);

    setPerson(person.concat({ name: newName }));
    setNewName('');
  };

  const handleInputChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {person.map((entry) => (
        <p key={entry.name}>{entry.name}</p>
      ))}
    </div>
  );
}

export default App;
