import React from "react";

const Header = ({ leftChild, headText, rightChild }) => {
  return (
    <header>
      <div className="head-left">{leftChild}</div>
      <div className="head-text">{headText}</div>
      <div className="head-right">{rightChild}</div>
    </header>
  );
};

export default Header;
