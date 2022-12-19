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
        color: isSelecteed ? "rgb(98 98 98)" : undefined,
      }}
    >
      <Icon size={40} className="optionIcon" />
      <div className="optionName">{text}</div>
    </div>
  );
};
