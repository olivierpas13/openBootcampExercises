import { useState } from "react";

const Vote = ({ anecdotes, index }) => {
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  const voteAnecdote = () => {
    let newArray = [...votes];
    newArray[index] += 1;

    setVotes(newArray);
  };

  const anecdoteOfTheDay = (votes) => {
    const max_of_array = Math.max.apply(Math, votes);

    const index = votes.indexOf(max_of_array);

    return (
      <div>
        <p>{anecdotes[index]}</p>
        <p>has {max_of_array} votes</p>
      </div>
    );
  };

  return (
    <div>
      <button type="button" onClick={() => voteAnecdote()}>
        vote
      </button>
      <p>has {votes[index]} votes</p>
      <h2>Anecdote with most votes</h2>
      {anecdoteOfTheDay(votes)}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [index, setSelected] = useState(0);

  const randomAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length);

    setSelected(newAnecdote);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[index]}</p>
      <button onClick={randomAnecdote}>next anecdote</button>
      <br />
      <Vote anecdotes={anecdotes} index={index} />
    </div>
  );
};

export default App;
