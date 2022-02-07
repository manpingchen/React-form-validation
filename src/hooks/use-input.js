import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputReducer = (state, action) => {
  if (action.type === "VALUE_CHANGE") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return state;
};

const useInput = (validateValuefunction) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

  const isEnteredValueValid = validateValuefunction(inputState.value);
  const hasError = !isEnteredValueValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({ type: "VALUE_CHANGE", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const resetInputHandler = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isEnteredValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    resetInputHandler,
  };
};

export default useInput;
