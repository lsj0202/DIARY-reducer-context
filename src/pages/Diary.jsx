import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import MyButton from "../components/MyButton";

const Diary = () => {
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기 입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중 입니다...</div>;
  } else {
    return (
      <Header
        headText={`${getStringDate(new Date(data.date))} 기록`}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          <MyButton
            text={"수정하기"}
            onClick={() => {
              navigate(`/edit/${data.id}`);
            }}
          />
        }
      />
    );
  }
};

export default Diary;
