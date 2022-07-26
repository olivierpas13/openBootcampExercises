import { Header } from "./Header";
import { Content } from "./Content";

export const Course = ({ course }) => {
  console.log(course.parts);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      course component
    </div>
  );
};
