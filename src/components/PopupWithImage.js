import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image-card");
    this._imageCaption = this._popupElement.querySelector(".modal__caption-card");

  }
  open(title, link) {
    this._imageElement.alt = title;
    this._imageCaption.textContent = title;
    this._imageElement.src = link;
    super.open();
  }
}