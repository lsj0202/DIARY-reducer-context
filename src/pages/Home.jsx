import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getTime();

      setData(
        diaryList.filter((el) => firstDay <= el.date && el.date <= lastDay)
      );
    }
  }, [diaryList, date]);

  useEffect(() => {
    console.log(data);
  }, [data]);
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
    <>
      <Header
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        headText={headeText}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </>
  );
};

export default Home;
