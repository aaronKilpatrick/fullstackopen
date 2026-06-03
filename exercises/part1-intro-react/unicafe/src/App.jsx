import { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, votes }) => (
  <tr>
    <td>{text}</td>
    <td>{votes}</td>
  </tr>
);

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = (props.good + props.bad * -1) / all;
  const positive = (props.good / all) * 100;

  const totalVotes = Object.values(props).reduce(
    (acc, current) => acc + current,
    0,
  );
  if (totalVotes <= 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" votes={props.good} />
          <StatisticLine text="neutral" votes={props.neutral} />
          <StatisticLine text="bad" votes={props.bad} />
          <StatisticLine text="all" votes={all} />
          <StatisticLine text="average" votes={average} />
          <StatisticLine text="positve" votes={`${positive} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <Heading text="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
