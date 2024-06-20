import { useState } from 'react';

const Heading = ({ heading }) => <h1>{heading}</h1>;

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ stat, text, suffix }) => (
  <tr>
    <td>{text}</td>
    <td>{stat}{suffix}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total    = good + bad + neutral;
  const avg      = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return (
      <div>
        <Heading heading="statistics" />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Heading heading="statistics" />
      <table>
        <tbody>
          <StatisticsLine stat={good} text="good" />
          <StatisticsLine stat={neutral} text="neutral" />
          <StatisticsLine stat={bad} text="bad" />
          <StatisticsLine stat={total} text="all" />
          <StatisticsLine stat={avg} text="average" />
          <StatisticsLine stat={positive} text="positive" suffix="%" />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <Heading heading="give feedback" />
        <Button handleClick={incrementGood} text="good" />
        <Button handleClick={incrementNeutral} text="neutral" />
        <Button handleClick={incrementBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
