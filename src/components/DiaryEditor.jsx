import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    id: 1,
    img: process.env.PUBLIC_URL + "/assets/emotion1.png",
    descript: "완전 좋음",
  },
  {
    id: 2,
    img: process.env.PUBLIC_URL + "/assets/emotion2.png",
    descript: "좋음",
  },
  {
    id: 3,
    img: process.env.PUBLIC_URL + "/assets/emotion3.png",
    descript: "그럭저럭",
  },
  {
    id: 4,
    img: process.env.PUBLIC_URL + "/assets/emotion4.png",
    descript: "나쁨",
  },
  {
    id: 5,
    img: process.env.PUBLIC_URL + "/assets/emotion5.png",
    descript: "끔찍함",
  },
];
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState();
  const navigate = useNavigate();

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const prevPage = () => {
    navigate(-1);
  };

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  return (
    <div>
      <Header
        headText={isEdit ? "일기 수정 하기" : "새 일기 작성"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={prevPage} />}
      />
      <div>
        <section>
          <h4>오늘은 언제 인가요?</h4>
          <div className="input-box">
            <input
              className="input-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input-box emotion_list_wrapper">
            {emotionList.map((el) => (
              <EmotionItem
                key={el.id}
                {...el}
                onClick={handleClickEmotion}
                isSelected={el.id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="control-box">
            <MyButton
              text="뒤로가기"
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton
              text={isEdit ? "수정완료" : "작성완료"}
              type="positive"
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
