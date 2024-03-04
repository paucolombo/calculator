import { memo, useReducer, useRef, useCallback } from "react";
import { calculate } from "../utils/calculate";

const INITIAL_CALCULATOR_STATE = {
  n1: 0,
  operation: "",
  result: 0,
  historicResults: [],
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "SET_OPERATION":
      return {
        ...state,
        n1: parseInt(action.payload.inputValue),
        operation: action.payload.operation,
      };
    case "CALCULATE":
      return {
        ...state,
        result: action.payload,
        n1: 0,
        operation: "",
        historicResults: [...state.historicResults, action.payload],
      };
    default:
      return state;
  }
};

const Calculator = memo(() => {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    INITIAL_CALCULATOR_STATE
  );
  const input = useRef();


  const { result, operation, n1, historicResults } =
    state;
  const setOperation = useCallback(
    (operation) => {
      dispatch({
        type: "SET_OPERATION",
        payload: { inputValue: input.current.value, operation: operation },
      });
      input.current.value = "";
    },
    [operation]
  );

  function onClickButton(event) {
    input.current.focus();
    if (event.target.innerHTML != "=") {
      setOperation(event.target.innerHTML)
    }
    else {
      calculate(dispatch, input, n1, operation)
    }
  }

  return (
    <>
      <input type="number" id="numero" ref={input} autoFocus ></input>
      <div className="container">
        <button onClick={onClickButton}>+</button>
        <button onClick={onClickButton}>-</button>
        <button onClick={onClickButton}>x</button>
        <button onClick={onClickButton}>/</button>
        <button onClick={onClickButton}>%</button>
        <button onClick={onClickButton}>=</button>
      </div>
      <div className="results">
        <h2>Último Resultado: {result} </h2>
        <h3> Resultados históricos: </h3>
        {historicResults.map((resultH, index) => (
          <span key={index}> {resultH}, </span>
        ))}
      </div>
    </>);
});
Calculator.displayName = 'Calculator';
export default Calculator