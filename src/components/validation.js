function showInputError (formElement, inputElement, errorMessage, settings) { // показать ошибку валидации
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError (formElement, inputElement, settings) {  // скрыть ошибку валидации
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, settings) {  // проверить валидацию поля
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

function hasInvalidInput (inputList)  {  // есть ли хоть один невалидный импут - для кнопки
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const disableSubmitButton = (buttonElement, settings) => {
  buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, settings) => {
  buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
};

function toggleButtonState (inputList, buttonElement, settings) { // валидаций кнопки
  if (hasInvalidInput(inputList)) { 
    disableSubmitButton (buttonElement, settings);
  } else {
    enableSubmitButton (buttonElement, settings);
  }
}

export function clearValidation (formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  disableSubmitButton (buttonElement, settings);

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    });
};

function setEventListeners (formElement, settings) {  // слушатели для инпутов
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

export function enableValidation (settings) {  // общай функция проверки валидации
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
     setEventListeners(formElement, settings);
   });
};