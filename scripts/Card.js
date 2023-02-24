import { handleCardClick } from "./index.js";

const modalCaption = document.querySelector("#card-modal-caption");
const modalImageCard = document.querySelector("#modal-image-card");



class Card {

  constructor(cardData, cardSelector){
    this._title = cardData.title;
    this._link = cardData.link;


    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._cardLikeButton.classList.toggle("card__like-button_toggle")
    });
  
    this._cardRemoveButton.addEventListener("click", this._removeCard);
  
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageModal();
    });
  }

  _removeCard = () => {
    this._element.remove();
  };

  _handleCardImageModal() {
    modalImageCard.src = this._link;
    modalImageCard.alt = this._title;
    modalCaption.textContent = this._title;
    handleCardClick();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true)
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title")
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardRemoveButton = this._element.querySelector('#card-remove-button');

    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._title;
  

    this._setEventListeners();

    return this._element;


  }

}


export default Card;