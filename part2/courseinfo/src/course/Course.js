import { Header } from "./Header";
import  Content  from "./Content";
import { TotalSum } from "./TotalSum";

export const Course = ({ course }) => {
  console.log(course.parts);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <TotalSum exercises = {course.parts}/>
    </div>
  );
};
