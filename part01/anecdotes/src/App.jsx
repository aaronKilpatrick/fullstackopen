import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const AnecdoteSection = ({ heading, anecdote }) => {
  return (
    <section>
      <h1>{heading}</h1>
      <p>{anecdote}</p>
    </section>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const points = () => {
    let points = {};
    for (let i = 0; i < anecdotes.length; i++) points[i] = 0;
    return points;
  };

  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);
  const [scores, setScore] = useState(points);

  const setRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);

    setSelected(randomNumber);
  };

  const updateMostVotes = (scores) => {
    const highestScore = Math.max(...Object.values(scores));
    setMostVotes(Object.keys(scores).find(key => scores[key] === highestScore));
  }

  const updateScore = () => {
    const newScore = { ...scores };
    newScore[selected] += 1;

    updateMostVotes(newScore);
    setScore(newScore);
  };
  
  return (
    <div>
      <AnecdoteSection
        heading="Anecdote of the Day"
        anecdote={anecdotes[selected]}
      />
      <div>
        <Button handleClick={setRandomQuote} text="next anecdote" />
        <Button handleClick={updateScore} text="vote" />
      </div>
      <AnecdoteSection
        heading="Anecdote with most Votes"
        anecdote={anecdotes[mostVotes]}
      />
    </div>
  );
};

export default App;
