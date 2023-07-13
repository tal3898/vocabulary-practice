import React from "react";
import Sidebar from "react-sidebar";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SlidingMenu = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={isOpen}
      onSetOpen={(open) => setIsOpen(open)}
      styles={{ sidebar: { background: "white" } }}
    />
  );
};

export default SlidingMenu;
