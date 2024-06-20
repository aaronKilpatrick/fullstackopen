import { useState } from 'react';

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (value) => {
    setValue(value);
  }


  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(50)} text='50' />
    </div>
  );
};

export default App;
