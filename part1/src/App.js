const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const parts = [part1, part2, part3];
  const numbers = [exercises1, exercises2, exercises3];
  const total = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} numbers={numbers} />
      <Total numbers={numbers} total={total} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts, numbers }) => {
  return (
    <div>
      <Part name={parts[0]} number={numbers[0]} />
      <Part name={parts[1]} number={numbers[1]} />
      <Part name={parts[2]} number={numbers[2]} />
    </div>
  );
};

const Total = ({ numbers, total }) => {
  console.log(numbers[0]);
  return <p>Number of exercises {total}</p>;
};

export default App;

const Part = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};
