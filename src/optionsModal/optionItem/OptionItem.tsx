import { IconType } from "react-icons";
import { LearningOption } from "../../models/learningOption";
import "./OptionItem.css";

interface Props {
  text: string;
  reactIcon: IconType;
  isSelecteed: boolean;
  optionType: LearningOption;
  setSelectedOption: (isOpen: LearningOption) => void;
}

export const OptionItem = ({
  reactIcon: Icon,
  text,
  optionType,
  isSelecteed,
  setSelectedOption,
}: Props) => {
  return (
    <div
      className="specificPracticeOption"
      onClick={() => setSelectedOption(optionType)}
      style={{
        backgroundColor: isSelecteed ? "rgb(106, 106, 106)" : undefined,
      }}
    >
      <Icon size={40} className="optionIcon" />
      <div className="optionName">{text}</div>
    </div>
  );
};
