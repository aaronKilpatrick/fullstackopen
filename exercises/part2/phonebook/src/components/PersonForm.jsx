const PersonForm = (props) => {
  return (
    <form>
      <div>
        Name: <input value={props.newName} onChange={props.handleNewName} />
      </div>
      <div>
        Number:{" "}
        <input value={props.newNumber} onChange={props.handleNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={props.onClick}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
