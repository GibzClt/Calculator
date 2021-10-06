import React from "react";
import "./Keypad.css";

const ADD_VALUE = "ADD_VALUE";
const CLEAR = "CLEAR";
const CALCULATE = "CALCULATE";

function Keypad({changeValue}){
  return (
    <div id="Keypad">
      <button id="clear" className="col-2" onClick={(e)=>changeValue(CLEAR, "")}>AC</button>
      <button id="divide" className="operator" onClick={(e)=>changeValue(ADD_VALUE, "/")}>/</button>
      <button id="multiply" className="operator" onClick={(e)=>changeValue(ADD_VALUE, "x")}>x</button>
      <button id="seven" className="number" onClick={(e)=>changeValue(ADD_VALUE, "7")}>7</button>
      <button id="eight" className="number" onClick={(e)=>changeValue(ADD_VALUE, "8")}>8</button>
      <button id="nine" className="number" onClick={(e)=>changeValue(ADD_VALUE, "9")}>9</button>
      <button id="subtract" className="operator" onClick={(e)=>changeValue(ADD_VALUE, "-")}>-</button>
      <button id="four" className="number" onClick={(e)=>changeValue(ADD_VALUE, "4")}>4</button>
      <button id="five" className="number" onClick={(e)=>changeValue(ADD_VALUE, "5")}>5</button>
      <button id="six" className="number" onClick={(e)=>changeValue(ADD_VALUE, "6")}>6</button>
      <button id="add" className="operator" onClick={(e)=>changeValue(ADD_VALUE, "+")}>+</button>
      <button id="one" className="number" onClick={(e)=>changeValue(ADD_VALUE, "1")}>1</button>
      <button id="two" className="number" onClick={(e)=>changeValue(ADD_VALUE, "2")}>2</button>
      <button id="three" className="number" onClick={(e)=>changeValue(ADD_VALUE, "3")}>3</button>
      <button id="equals" className="row-2" onClick={(e)=>changeValue(CALCULATE)}>=</button>
      <button id="zero" className="number col-2" onClick={(e)=>changeValue(ADD_VALUE, "0")}>0</button>
      <button id="decimal" onClick={(e)=>changeValue(ADD_VALUE, ".")}>.</button>
    </div>
  )
}

export default Keypad;