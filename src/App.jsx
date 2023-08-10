import "./App.css";
import React, { useReducer, useRef } from "react"; // Removed useContext import

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((el) => el.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((el) =>
        el.id === action.data.id ? { ...action.data } : el
      );
      break;
    }
    default:
      return state;
  }

  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummy = [
  {
    id: 1,
    content: "첫 번째 일기",
    emotion: 1,
    date: 1691670614722,
  },
  {
    id: 2,
    content: "두 번째 일기",
    emotion: 2,
    date: 1691670614726,
  },
  {
    id: 3,
    content: "세 번째 일기",
    emotion: 3,
    date: 1691670614728,
  },
  {
    id: 4,
    content: "네 번째 일기",
    emotion: 4,
    date: 1691670614729,
  },
  {
    id: 5,
    content: "다섯 번째 일기",
    emotion: 5,
    date: 1691670614735,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummy);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date().getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, emotion, content, date) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date().getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </Router>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
