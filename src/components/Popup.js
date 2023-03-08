export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.closeBtn = this._popupElement.querySelector(".modal__close");
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if(evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
    });

    this.closeBtn.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }
}