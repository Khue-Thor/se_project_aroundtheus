
class Card {

  constructor(
    {cardData, userId, handleImageClick, handleDeleteClick, handleCardLikes},
     cardSelector)
     {
    this._link = cardData.link;
    this._title = cardData.name;
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._cardSelector = cardSelector;
    
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLikes = handleCardLikes;
}

  getCardId = () => this._id;

  _getTemplate() {
    const cardTemplate =  document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true)

    return cardTemplate;
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _handlePreview() {
    this._handleImageClick(this._title, this._link);
    
  };

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _renderLikes() {
    this._cardLikeCount.textContent = this._likes.length || "";

    if(this.isLiked()) {
      this._cardLikeButton.classList.add("card__like-button_toggle")
    } else {
      this._cardLikeButton.classList.remove("card__like-button_toggle")
    }
  }

 

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleCardLikes())

    this._element
    .querySelector(".card__image")
    .addEventListener("click", () => this._handlePreview());

    this._element
      .querySelector("#card-remove-button")
      .addEventListener("click", () => this._handleDeleteClick());
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardRemoveButton = this._element.querySelector('#card-remove-button');
    this._cardLikeCount = this._element.querySelector(".card__like-count");

    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._title;
  
    
    this._renderLikes();
    // remove the delete button from the API images
    if (this._userId !== this._ownerId) {
      this._cardRemoveButton.remove();
    } 

    return this._element;

  }
  
}


export default Card;