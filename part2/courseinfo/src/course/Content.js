import { Part } from "./Part";

export const Content = ({ parts }) => {
  console.log(parts[0]);
  return parts.map((part) => (
    <div key={part.id}>
      <Part courses={part.name} exercises={part.exercises} />
    </div>
  ));
};
