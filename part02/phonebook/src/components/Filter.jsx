const Filter = ({ filter, setFilter }) => {
  return (
    <label>
      Filter:{' '}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </label>
  );
};

export default Filter;
