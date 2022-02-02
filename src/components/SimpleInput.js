import { useState } from "react";

const SimpleInput = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isEnteredValueTouched, setIsEnteredValueTouched] = useState(false);

  const isEnteredValueValid = enteredValue.trim() !== "";

  const nameInputHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setIsEnteredValueTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsEnteredValueTouched(true);

    if (!isEnteredValueValid) {
      return;
    }
    console.log(enteredValue);
    setEnteredValue("");
    setIsEnteredValueTouched(false);
  };

  const nameInputIsInvalid = !isEnteredValueValid && isEnteredValueTouched;

  const nameInputClasses = !nameInputIsInvalid ? "form-control" : "form-control invalid";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredValue}
          onBlur={nameInputBlurHandler}
          onChange={nameInputHandler}
        />
        {nameInputIsInvalid && <p className="error-text">Please enter a name.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
