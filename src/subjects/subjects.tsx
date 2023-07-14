import { BiMemoryCard } from "react-icons/bi";
import { SubjectItem } from "./subjectItem/subjectItem";

export const Subjects = () => {
  return (
    <div style={{ margin: "auto" }}>
      <SubjectItem text={"Numbers"} reactIcon={BiMemoryCard} />
      <SubjectItem text={"Numbers"} reactIcon={BiMemoryCard} />
    </div>
  );
};
