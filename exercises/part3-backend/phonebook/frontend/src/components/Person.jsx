const Persons = ({ persons, onClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{' '}
          <button onClick={() => onClick(person)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
