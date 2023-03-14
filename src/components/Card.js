
class Card {

  constructor({cardData, userId, handleImageClick, handleDeleteClick}, cardSelector){
    this._link = cardData.link;
    this._title = cardData.title;
    this.userId = userId;
    this._ownerId = cardData.owner._id;
    this._id = cardData._id;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;

    this._cardSelector = cardSelector;
    
  }

  getCardId = () => this._id;

  

  

  _handleLikeButton = () => {
    this._cardLikeButton.classList.toggle("card__like-button_toggle");
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _handlePreview() {
    this._handleImageClick(this._title, this._link);
    
  };

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true)
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => this._handleLikeButton())
    this._cardRemoveButton.addEventListener("click", this._handleDeleteClick());
    this._cardImage.addEventListener("click", () => this._handlePreview());
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector("#card-title");
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardRemoveButton = this._element.querySelector('#card-remove-button');

    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
    cardTitle.textContent = this._title;
  
    this._setEventListeners();
    
    if (this._userId !== this._ownerId) {
      this._cardRemoveButton.remove();
    } 

    return this._element;

  }
  
}


export default Card;