import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    //prettier-ignore
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
        setNotes(response.data);
      });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const note = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    //prettier-ignore
    axios
      .post('http://localhost:3001/notes', note)
      .then((response) => {
        console.log(response.data);
        setNotes(notes.concat(note));
        setNewNote('');
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    //prettier-ignore
    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default App;
