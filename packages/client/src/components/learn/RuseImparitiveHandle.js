import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default function RuseImparitiveHandle() {
  const newRef = useRef();
  useEffect(() => {
    console.log("parent", newRef.current);
  }, []);
  const focusInput = () => {
    if (newRef.current) {
      newRef.current.focus();
    }
  };
  const blurInput = () => {
    if (newRef.current) {
      newRef.current.blur();
    }
  };
  return (
    <>
      <Child ref={newRef} />
      <button onClick={focusInput}>Focus</button>
      <button onClick={blurInput}>Blur</button>
      <p>
        Forward ref is a HOC that wrap a component inside forwardRef, the main
        diffrence is it takes two extra ref parameter. basically used to pass
        the refrenced value to chold compo
      </p>
      <p>
        Use Imparitive handle: hook used with ref and foarward ref. if we want
        to make changes in parent callback function from child then we need to
        use it
      </p>
    </>
  );
}

const Child = forwardRef(function Child(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));
  return (
    <>
      <input ref={ref} name="name" />
    </>
  );
});
