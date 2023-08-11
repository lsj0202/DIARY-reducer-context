import React from "react";

const EmotionItem = ({ id, img, descript, onClick, isSelected }) => {
  return (
    <div
      onClick={() => {
        onClick(id);
      }}
      className={`emotion_item ${
        isSelected ? `emotion_on_${id}` : "emotionItem_off"
      }`}
    >
      <img src={img} alt="img" />
      <span>{descript}</span>
    </div>
  );
};

export default EmotionItem;
