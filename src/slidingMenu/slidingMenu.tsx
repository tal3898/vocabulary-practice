import React from "react";
import Sidebar from "react-sidebar";
import "./slidingMenu.css";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SlidingMenu = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Sidebar
      sidebar={
        <div>
          <div className="menuOptionItem">New</div>
          <div className="menuOptionItem">Train</div>
          <div className="menuOptionItem">Know</div>
          <div className="menuOptionItem">Subjects</div>
          <div className="menuOptionItem">Chat</div>
          <div className="menuOptionItem">Settings</div>
        </div>
      }
      open={isOpen}
      onSetOpen={(open) => setIsOpen(open)}
      styles={{ sidebar: { background: "white", width: "200px" } }}
    />
  );
};

export default SlidingMenu;
