export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    
  }

  _handleEscUp(evt) {
    evt.preventDefault();
    if(evt.which === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
    })
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.removeEventListener('keyup', this._handleEscUp);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener('keyup', this._handleEscUp);
  }
}