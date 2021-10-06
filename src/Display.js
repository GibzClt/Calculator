import React from "react";

function Display({dispValue}){
  return(
    <div id="display">
      {dispValue? dispValue : 0}
    </div>
  )
}

export default Display;