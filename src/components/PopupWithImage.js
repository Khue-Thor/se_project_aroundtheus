import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image-card");
    this._imageCaption = this._popupElement.querySelector(".modal__caption-card");

  }
  open({name, link}) {
    this._imageElement.alt = name;
    this._imageCaption.textContent = name;
    this._imageElement.src = link;
    super.open();
  }
}