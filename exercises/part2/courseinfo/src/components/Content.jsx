import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total total={totalExercises} />
    </div>
  );
};

export default Content;
