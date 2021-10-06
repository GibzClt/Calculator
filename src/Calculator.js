import React from "react";
import "./Calculator.css";
import Display from "./Display";
import Keypad from "./Keypad";
import {createStore} from "redux";
import { Provider,connect } from "react-redux";

const ADD_VALUE = "ADD_VALUE";
const CLEAR = "CLEAR";
const CALCULATE = "CALCULATE";

const initialState = {
  value : ""
}

function calculate(value){
  if(value.indexOf("+") !== -1){
    return calculate(value.substring(0, value.indexOf("+"))) + calculate(value.substring(value.indexOf("+")+1))
  }
  if(value.indexOf("-") !== -1){
    return calculate(value.substring(0, value.indexOf("-"))) - calculate(value.substring(value.indexOf("-")+1))
  }
  if(value.indexOf("x") !== -1){
    return calculate(value.substring(0, value.indexOf("x"))) * calculate(value.substring(value.indexOf("x")+1))
  }
  if(value.indexOf("/") !== -1){
    return calculate(value.substring(0, value.indexOf("/"))) / calculate(value.substring(value.indexOf("/")+1))
  }
  if(parseFloat(value) !== NaN){
    return parseFloat(value);
  }
  // return parseFloat(value);
}

function sanitize(value){
  let arr = value.trim().split("");
  console.log("arr " , arr)
  let valArr = [];
  let regex = /[+\-x/]/;
  let temp = "";
  for(let i = 0; i < arr.length; i++){
    debugger;
    if(regex.test(arr[i])){
      valArr.push(temp);
      valArr.push(arr[i])
      temp = ""
      continue;
    }
    temp+=arr[i];
  }
  valArr.push(temp);
  console.log("valArr " , valArr)

  let finalArr = [];
  for(let i = 0; i < valArr.length-1; i++){
    debugger;
    if(regex.test(valArr[i]) && regex.test(valArr[i+1])){
      if(valArr[i+1] !== "-" && valArr[i+1] !== "+"){
        finalArr.push(valArr[i]);
        i++;
      }
    }
    finalArr.push(valArr[i]);
  }
  console.log(finalArr)
  return finalArr.join("");
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case ADD_VALUE : return {value : state.value + action.value};
    case CLEAR : return {value : action.value};
    case CALCULATE : return {value : calculate(state.value)};
    default : return state;
  }
}

const actionCreator = (category, value)=>{
  switch(category){
  case ADD_VALUE : return {type : ADD_VALUE, value};
  case CLEAR : return {type : CLEAR, value};
  case CALCULATE : return { type : CALCULATE};
  default : return {type : "NOTHING"};
  }
}

const store = createStore(reducer);

const mapStateToProps = (state)=>{
  console.log(state.value);
  return {
    dispValue : state.value
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    changeValue : (category, value)=>dispatch(actionCreator(category, value))
  }
}

const ConDisplay = connect(mapStateToProps, null)(Display);
const ConKeypad = connect(null, mapDispatchToProps)(Keypad);

function Calculator(){
  return(
    <div id="Calculator">
      <Provider store={store}>
        <ConDisplay />
        <ConKeypad />    
      </Provider>
    </div>
  )
}

export default Calculator;