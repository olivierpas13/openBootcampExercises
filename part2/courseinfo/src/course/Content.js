import { Part } from "./Part";

export const Content = ({ parts }) => {
  let exercises = parts.map((part) => part.exercises);

  const Sum = exercises.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  console.log(Sum);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} courses={part.name} exercises={part.exercises} />
      ))}
      <p><strong>total of {Sum} exercises</strong></p>
    </div>
  );
};


export default Content;
