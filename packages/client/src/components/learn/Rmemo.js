import React from "react";

const Rmemo = React.memo(({ name, age }) => {
  return (
    <div>
      {name} -- {age}
    </div>
  );
});
export default Rmemo;
