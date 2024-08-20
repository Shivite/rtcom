// useReducer: for managing the more complex state logic we use reducers

import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: action.payload.count };
    case "DECREMENT":
      return { count: state.count-- };
    default:
      throw new Error();
  }
};

const RuseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>count value: {state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT", payload: { count: state.count + 5 } });
        }}
      >
        INCREMENT
      </button>
      <button
        onClick={() => {
          dispatch({ type: "DECREMENT" });
        }}
      >
        DECREMENT
      </button>
    </div>
  );
};

export default RuseReducer;
