import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Buttons = ({ functions }) => {
  return (
    <div>
      <button onClick={functions[0]}>good</button>
      <button onClick={functions[1]}>neutral</button>
      <button onClick={functions[2]}>bad</button>
    </div>
  );
};

const Positive = ({ good, total }) => {
  const positive = (good / total) * 100;
  return (
    <tr>
      <td>positive </td>
      <td>{positive} %</td>
    </tr>
  );
};

const Average = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  bad = -bad;
  neutral = neutral * 0;
  const promedio = (good + bad + neutral) / total;
  return (
    <tr>
      <td>average</td>
      <td>{promedio}</td>
    </tr>
  );
};

const Total = ({ good, bad, neutral }) => {
  return (
    <tr>
      <td>all</td>
      <td>{good + bad + neutral}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          {/* <div> */}
          <StatisticLine text={"good"} value={good} />

          <StatisticLine text={"neutral"} value={neutral} />

          <StatisticLine text={"bad"} value={bad} />

          <Total good={good} bad={bad} neutral={neutral} />

          <Average good={good} bad={bad} neutral={neutral} />

          <Positive good={good} total={good + bad + neutral} />
          {/* </div> */}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Buttons
        functions={[handleClickGood, handleClickNeutral, handleClickBad]}
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
