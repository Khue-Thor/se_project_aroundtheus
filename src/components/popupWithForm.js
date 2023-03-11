import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._formInputs = this._modalForm.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
    (inputValues[input.name] = input.value);
    });
    return inputValues;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // setInputValues(data) {
  //   this._formInputs.forEach((input) => {
  //     // here you insert the `value` by the `name` of the input
  //     input.value = data[input.name];
  //   });
  // }

}
