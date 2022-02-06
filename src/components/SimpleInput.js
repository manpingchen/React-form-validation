import { useState } from "react";

const validateEmailHandler = (emailAddress) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(emailAddress)
};

const SimpleInput = () => {
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameTouched, setIsEnteredNameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isEnteredEmailTouched, setIsEnteredEmailTouched] = useState(false);

  const isEnteredNameValid = enteredName.trim() !== "";
  const isEnteredEmailValid = validateEmailHandler(enteredEmail);

  let formIsValid = false;

  if (isEnteredNameValid && isEnteredEmailValid) {
    formIsValid = true;
  }

  const nameInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setIsEnteredNameTouched(true);
  };

  const emailInputHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = () => {
    setIsEnteredEmailTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    
    setIsEnteredNameTouched(true);
    setIsEnteredEmailTouched(true);
    
    if (!isEnteredNameValid || !isEnteredEmailValid) {
      return;
    }
    
    console.log({ enteredName, enteredEmail });
    setEnteredName("");
    setEnteredEmail("");
    setIsEnteredNameTouched(false);
    setIsEnteredEmailTouched(false);
  };

  const nameInputIsInvalid = !isEnteredNameValid && isEnteredNameTouched;
  const emailInputIsInvalid = !isEnteredEmailValid && isEnteredEmailTouched;
  const nameInputClasses = !nameInputIsInvalid ? "form-control" : "form-control invalid";
  const emailInputClasses = !emailInputIsInvalid ? "form-control" : "form-control invalid";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onBlur={nameInputBlurHandler}
          onChange={nameInputHandler}
        />
        {nameInputIsInvalid && <p className="error-text">Please enter a name.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
          onChange={emailInputHandler}
        />
        {emailInputIsInvalid && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
