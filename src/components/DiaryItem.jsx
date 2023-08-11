import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const newDate = new Date(parseInt(date)).toLocaleDateString();

  const handleDiaryClick = () => {
    navigate(`/diary/${id}`);
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`}
          alt="img"
          onClick={handleDiaryClick}
        />
      </div>
      <div className="info_wrapper">
        <div className="right_div">
          <div className="diary_date" onClick={handleDiaryClick}>
            {newDate}
          </div>
          <div className="diary_contents" onClick={handleDiaryClick}>
            {content.slice(0, 25)}
          </div>
        </div>
        <div className="left_div">
          <div className="btn_wrapper">
            <MyButton text={"수정하기"} onClick={handleEditClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryItem;
