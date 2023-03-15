import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popSelector) {
    super(popSelector);
    this._modalElement = document.querySelector(popSelector);
    this._submitButton = this._modalElement.querySelector(".modal__form-save");
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }

  setSubmitAction(handleSubmit) {
    this._submitButton.addEventListener("click", handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}