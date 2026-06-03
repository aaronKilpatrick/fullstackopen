import { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Anecdote = ({ anecdote, votes }) => {
  return (
    <p>
      {anecdote}
      <br />
      has {votes} votes.
    </p>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  let votesInit = [];
  for (let i = 0; i < anecdotes.length; i++) votesInit = votesInit.concat(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesInit);

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const highestVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <>
      <div>
        <Heading text="Anecdote of the day" />
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
        <Button onClick={handleVotes} text="vote" />
        <Button onClick={handleClick} text="random annecdote" />
      </div>
      <div>
        <Heading text="Anecdote with the most votes" />
        <Anecdote
          anecdote={anecdotes[highestVotedIndex]}
          votes={votes[highestVotedIndex]}
        />
      </div>
    </>
  );
};

export default App;
