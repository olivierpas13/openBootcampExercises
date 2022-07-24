import { Component, useState } from "react";

const Vote = ({ anecdotes, index }) => {
  // const [votes, setVotes] = useState({
  // arrayOfVotes: new Uint8Array(anecdotes.length),

  // arrayOfVotes: { 0: 0, 1: 0, 2: 0);

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  // console.log(votes);
  // const points = ;

  const voteAnecdote = () => {
    let newArray = { ...votes };

    newArray[JSON.stringify(index)] += 1;
    setVotes(newArray);
  };
  const anecdoteOfTheDay = (votes) => {
    // let obj = { a: 4, b: 0.5 , c: 0.35, d: 5 };
    let arr = Object.values({ votes });
    // let min = Math.min(...arr);
    let max = Math.max(...arr);
    // const max_of_array = Math.max.apply(Math, { votes });
    console.log(max);
  };
  return (
    <div>
      <p>has {votes[index]} votes</p>
      <button onClick={() => voteAnecdote()}>vote</button>
      <button
        onClick={() => {
          anecdoteOfTheDay(votes);
        }}
      >
        anecdote
      </button>
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

  // const [selected, setSelected] = useState({
  //   // selected: 0,
  //   // points: new Uint8Array(anecdotes.length),
  // });

  const randomAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length);

    setSelected(newAnecdote);
    // console.log(index);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[index]}</p>
      <br />
      {/* <p>has {selected} votes</p> */}
      {/* <button onClick={vote(selected)}>vote</button> */}
      <h2>Anecdote with most votes</h2>
      <Vote anecdotes={anecdotes} index={index} />
      <button onClick={randomAnecdote}>next anecdote</button>
      {/* <p>{anecdoteOfTheDay}</p> */}
    </div>
  );
};

export default App;
