import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  //   this._imageElement = this._popupElement.querySelector(".modal__image-card");
  //   this._imageCaption = this._popupElement.querySelector(".modal__caption-card");

  // }
  open(link, title) {
    this._popupElement.querySelector(".modal__caption-card").textContent = title;
    this._popupElement.querySelector(".modal__image-card").src = link;
    this._popupElement.alt = `Photo of ${title}`;
    super.open();
  }
}