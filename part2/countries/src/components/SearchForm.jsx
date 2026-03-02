const SearchForm = ({ value, onChange }) => {
  return (
    <form>
      <p>
        <label htmlFor="search">Find Countries </label>
        <input id="search" value={value} onChange={onChange} />
      </p>
    </form>
  );
};

export default SearchForm;
