import useInput from "../hooks/use-input";

const emailValidateHandler = (emailAddress) => {
  var mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(emailAddress);
};

const nameValidatefunction = (enteredName) => enteredName.trim() !== "";

const SimpleInput = () => {
  const {
    value: enteredName,
    isEnteredValueValid: isEnteredNameValid,
    hasError: isEnteredNameHasError,
    inputChangeHandler: nameInputHandler,
    inputBlurHandler: nameInputBlurHandler,
    resetInputHandler: nameInputResetHandler,
  } = useInput(nameValidatefunction);

  const {
    value: enteredEmail,
    isEnteredValueValid: isEnteredEmailValid,
    hasError: isEnteredEmailHasError,
    inputChangeHandler: emailInputHandler,
    inputBlurHandler: emailInputBlurHandler,
    resetInputHandler: emailInputResetHandler,
  } = useInput(emailValidateHandler);

  let formIsValid = false;

  if (isEnteredNameValid && isEnteredEmailValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isEnteredNameValid || !isEnteredEmailValid) {
      return;
    }
    nameInputResetHandler();
    emailInputResetHandler();
    console.log({ enteredName, enteredEmail });
  };

  const nameInputClasses = !isEnteredNameHasError ? "form-control" : "form-control invalid";
  const emailInputClasses = !isEnteredEmailHasError ? "form-control" : "form-control invalid";

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
        {isEnteredNameHasError && <p className="error-text">Please enter a name.</p>}
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
        {isEnteredEmailHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
