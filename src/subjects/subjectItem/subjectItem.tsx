import { IconType } from "react-icons";
import "./subjectItem.css";

interface Props {
  text: string;
  reactIcon: IconType;
}

export const SubjectItem = ({ text, reactIcon: Icon }: Props) => {
  return (
    <div className="subjectItem">
      <div>
        <Icon />
      </div>
      <div>{text}</div>
    </div>
  );
};
