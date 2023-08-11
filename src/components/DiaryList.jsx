import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((el, i) => (
        <option key={i} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) >= 3;
      } else {
        return parseInt(item.emotion) < 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date - a.date);
      } else {
        return parseInt(a.date - b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 원본배열 훼손x

    const filterList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filterList.sort(compare);

    return sortedList;
  };

  return (
    <div>
      <div className="menu_wrapper">
        <div className="left-col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right-col">
          <MyButton
            type={"positive"}
            text={"세 일기 쓰기"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((el) => (
        <DiaryItem key={el.id} {...el} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
