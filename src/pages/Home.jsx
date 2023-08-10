import React, { useContext, useState } from "react";
import Header from "../components/Header";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [date, setDate] = useState(new Date());

  const headeText = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  const increaseMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  const decreaseMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  return (
    <Header
      leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
      headText={headeText}
      rightChild={<MyButton text={">"} onClick={increaseMonth} />}
    />
  );
};

export default Home;
