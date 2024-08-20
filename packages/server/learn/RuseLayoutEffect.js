import React, { useLayoutEffect, useRef, useState } from "react";

const RuseLayoutEffect = () => {
  const eleRef = useRef();
  const [dimentions, setDimentions] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (eleRef.current) {
      const { offsetWidth, offsetHeight } = eleRef.current;
      setDimentions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);
  return (
    <div>
      <div ref={eleRef}>
        {" "}
        this will be auth resized after render but before paint
      </div>
      <div>
        Width: {dimentions.width}px, Height: {dimentions.height}px
      </div>
      <p>
        {" "}
        use alyout effect is as same as useEffect. but it run syncroneuosly
        after all dom mutaions. So when we want to make and element changes
        after render but before paint with will come in use
      </p>
    </div>
  );
};

export default RuseLayoutEffect;
