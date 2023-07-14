import { IconType } from "react-icons";
import "./menuOptionItem.css";

interface Props {
  onClick: () => void;
  text: string;
  reactIcon: IconType;
  disabled?: boolean;
}

export const MenuOptionItem = ({
  text,
  onClick,
  reactIcon: Icon,
  disabled: isDisabled = false,
}: Props) => {
  return (
    <div
      className={isDisabled ? "disabledOptionItem" : "menuOptionItem"}
      onClick={isDisabled ? undefined : onClick}
    >
      <div>
        <Icon style={{ marginTop: 3, marginRight: 10 }} />
      </div>
      <div>{text}</div>
    </div>
  );
};
