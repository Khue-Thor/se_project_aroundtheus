

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtn = document.querySelector(".modal__close");
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose());
  }

  handleOverlay(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      this.handleOverlay(evt);
    });

    this._closeBtn.addEventListener("click", () => {
      this.close();
    });
  }

  

 
}