import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = this._popupElement.querySelector(".modal__form");
    // All the input field classes from forms
    this._formInputs = this._modalForm.querySelectorAll(".modal__form-input");

    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonEl = this._modalForm.querySelector(".modal__form-save");
    this._submitButtonText = this._submitButtonEl.textContent;
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonEl.textContent = "Saving...";
    } else {
      this._submitButtonEl.textContent = this._submitButtonText;
    }
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formInputs = this._getInputValues();
      this._handleFormSubmit(formInputs);
    });
  }
}
