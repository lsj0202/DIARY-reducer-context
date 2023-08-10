import React from "react";

const MyButton = ({ type, text, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={`MyButton ${btnType}`} onClick={onClick}>
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
