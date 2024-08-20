import React, { useCallback, useState } from "react";

const ChildComp = React.memo(({ onClick }) => {
  //react memo used to memoize
  console.log("here is the child comp");
  return <button onClick={onClick}>childCompo</button>;
});
const RuseCallback = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    // use callback needs to perform expesinve calculation and it will render only when
    console.log("parent called from ");
  }, []);
  return (
    <>
      <p>count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increment
      </button>
      <ChildComp onClick={handleClick} />

      <h5>
        {" "}
        Use Callback:Hook allow to cache function definition betweem re
        -renders. It returns memoized callback function from last render or
        initial render. It prevernt component to render Certainly! In a
        functional component, useCallback is used to memoize functions so that
        they don't get recreated on every render. This is useful for optimizing
        performance, especially when passing callbacks to child components or
        using functions inside useEffect.
      </h5>
    </>
  );
};

export default RuseCallback;
