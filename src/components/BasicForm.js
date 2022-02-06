import useInput from "../hooks/use-input";

const nameValidateHandler = (enteredValue) => enteredValue.trim() !== "";
const emailValidateHandler = (emailAddress) => {
  var mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(emailAddress);
};

const BasicForm = () => {
  const {
    value: enteredFirstName,
    isEnteredValueValid: isEnteredFirstNameValid,
    hasError: isEnteredFirstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    resetInputHandler: firstNameInputReseHandler,
  } = useInput(nameValidateHandler);

  const {
    value: enteredLastName,
    isEnteredValueValid: isEnteredLastNameValid,
    hasError: isEnteredLastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    resetInputHandler: lastNameInputReseHandler,
  } = useInput(nameValidateHandler);

  const {
    value: enteredEmail,
    isEnteredValueValid: isEnteredEmailValid,
    hasError: isEnteredEmailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    resetInputHandler: emailInputReseHandler,
  } = useInput(emailValidateHandler);

  let formValid = false;

  if (isEnteredFirstNameValid && isEnteredLastNameValid && isEnteredEmailValid) {
    formValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }
    firstNameInputReseHandler();
    lastNameInputReseHandler();
    emailInputReseHandler();
  };

  const firstNameFormClasses = isEnteredFirstNameHasError ? "form-control invalid" : "form-control";
  const lastNameFormClasses = isEnteredLastNameHasError ? "form-control invalid" : "form-control";
  const emailFormClasses = isEnteredEmailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={firstNameFormClasses}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameInputBlurHandler}
        />
        {isEnteredFirstNameHasError && <p className="error-text">Please enter your first name.</p>}
      </div>
      <div className={lastNameFormClasses}>
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameInputBlurHandler}
        />
        {isEnteredLastNameHasError && <p className="error-text">Please enter your last name.</p>}
      </div>
      <div className={emailFormClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {isEnteredEmailHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
