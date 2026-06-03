import Part from "./Part";

const Course = ({ course }) => {
  return <Part part={course[0]} />;
  // return (
  //   <div>
  //     {parts.map((part) => (
  //       <Part key={part.id} part={part} />
  //     ))}
  //   </div>
  // );
};

export default Course;
