import { useState } from "react";

const useInput = (validateValuefunction) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isEnteredValueValid = validateValuefunction(enteredValue);
  const hasError = !isEnteredValueValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInputHandler = () => {
    setIsTouched(false);
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    isEnteredValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    resetInputHandler,
  };
};

export default useInput;
