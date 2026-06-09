import React, { useState } from "react";

// Component Child
function Child(props) {
  return (
    <div> 
      <p>Nilai count dari Parent: {props.count}</p>
    </div>
  );
}

export default Child;