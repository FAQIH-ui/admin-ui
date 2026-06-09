// Component Parent 
import React, { useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div> 
      <p>Nilai count di Parent: {count}</p>
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>
        Tambah
      </button>
    </div>
  );
}

export default Parent;