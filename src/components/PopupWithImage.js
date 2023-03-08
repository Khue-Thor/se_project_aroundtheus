import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  open(title, link) {
    this._popupElement.querySelector(".modal__caption-card").textContent = title;
    this._popupElement.querySelector(".modal__image-card").src = link;
    this._popupElement.alt = title;
    super.open();
  }
}