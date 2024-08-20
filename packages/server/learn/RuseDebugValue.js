import React, { useDebugValue, useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  // Display the current count value in React DevTools
  useDebugValue(count);

  return [count, setCount];
}

const RuseDebugValue = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default RuseDebugValue;
