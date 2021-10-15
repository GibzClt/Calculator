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
  let cleanRegex = /(?<=-?\d+)[+\-x/]([+\-x/]*[+x/])/g;
  let divRegex = /(-?\d+\.\d+|-?\d+)\/(-?\d+\.\d+|-?\d+)/;
  let mulRegex = /(-?\d+\.\d+|-?\d+)x(-?\d+\.\d+|-?\d+)/;
  let subRegex = /(-?\d+\.\d+|-?\d+)-(-?\d+\.\d+|-?\d+)/;
  let addRegex = /(-?\d+\.\d+|-?\d+)\+(-?\d+\.\d+|-?\d+)/;
  
  value = value.replace(cleanRegex, (_, $1)=>{
    return $1[$1.length-1];
  });

  while(divRegex.test(value)){
    value = value.replace(divRegex, (_, $1, $2)=>{
      return parseFloat($1)/parseFloat($2);
    })
  }
  while(mulRegex.test(value)){
    value = value.replace(mulRegex, (_, $1, $2)=>{
      return parseFloat($1)*parseFloat($2);
    })
  }
  while(subRegex.test(value)){
    value = value.replace(subRegex, (_, $1, $2)=>{
      return parseFloat($1)-parseFloat($2);
    })
  }
  while(addRegex.test(value)){
    value = value.replace(addRegex, (_, $1, $2)=>{
      return parseFloat($1)+parseFloat($2);
    })
  }
  return value;
}

function sanitize(value){
  let opRegex = /^[+\-x/]$/;
  let decCount = 0;
  let arr = value.split("");
  let newArr = arr.filter(item=>{
    if(item==="."){
      decCount++;
      if(decCount >1){
        return false;
      }
    }else if(opRegex.test(item)){
      decCount = 0;
    }
    return true;
  })

  let newStr = newArr.join("");
  let zeroRegex = /(?<=[+\-x/])0(0+)(?=\d)|^0(0+)/g;
  newStr = newStr.replace(zeroRegex, '0');
  return newStr;
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case ADD_VALUE : return {value : sanitize(state.value + action.value)};
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