import { IconType } from "react-icons";
import "./subjectItem.css";

interface Props {
  icon: IconType;
  text: string;
}

export const SubjectItem = ({ icon: ReactIcon, text }: Props) => {
  return (
    <div className="subjectItemContainer">
      <ReactIcon size={20} className="radioIcon" />
      <div>{text}</div>
    </div>
  );
};
