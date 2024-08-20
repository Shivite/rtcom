import React, { useRef } from "react";

const RuseRef = () => {
  const inputRef = useRef(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <p>
        USEREF: react hook that allow direct access to dom element or an instace
        of a class component. Note: Refrence value remane same while re render 2
        if ref value change will not trigger re render
      </p>
      <ul>
        <li>useRef Hook: Creates a reference that persists across renders.</li>
        <li>ref Attribute: Attaches the ref to a DOM element.</li>
        <li> focus(), scrollIntoView()</li>
      </ul>
      <input ref={inputRef} name="name" />
      <button onClick={focusInput}>click to focus</button>
    </div>
  );
};

export default RuseRef;
