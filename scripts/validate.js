function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}


function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if(!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, config);
  } 
  hideInputError(formElement, inputElement, config);
  
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disablButton(submitButton, {inactiveButtonClass}) {
  submitButton.classList.add(inactiveButtonClass)
  submitButton.disabled = true;
}

function enableButton(submitButton, {inactiveButtonClass}) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputElement,submitButton, config) {
  if(hasInvalidInput(inputElement)) {
    disablButton(submitButton, config);
    return;
  } 

  enableButton(submitButton, config);  

}



function setEventListeners(formElement, config) {
  const { inputSelector } = config;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector('.modal__button');
  
  inputElements.forEach(inputElement => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}


function enableValidation(config) {
  const formElement = [...document.querySelectorAll(config.formSelector)];
  formElement.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}


const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(config);