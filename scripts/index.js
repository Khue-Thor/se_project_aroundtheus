const initialCards = [
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Bold Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];
/* -----------------*/
/*     Variables    */
/* -----------------*/

// sprint4 Variables
const profileEditButton = document.querySelector('.profile__edit');
const profileEditModal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile__title-input');
const profileDescriptionInput = document.querySelector('#profile__description-input');
const submitButton = document.querySelector('.modle__form_save');
const modalForm = document.querySelector('.modal__form');


const cardsContainer = document.querySelector('.cards');
const cardLists = cardsContainer.querySelector('.cards__list');

const cardTemplate = cardLists.querySelector('#card__template').content.firstElementChild;

// sprint5 Variables

const cardAddButton = document.querySelector("#card__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardModalCloseBtn = document.querySelector("#card-Add-Modal__close_button");

const cardAddForm = document.querySelector("#card-add-form");
const cardAddSubmit = document.querySelector("#card-add-submit");

const cardTitle = document.querySelector("#card-title");
const cardImage = document.querySelector("#card-image");

const cardTitleInput = document.querySelector("#card__title-input");
const cardImageInput = document.querySelector("#card__link-input");

const modalImage = document.querySelector("#card-modal-image");
const modalCaption = document.querySelector("#card-modal-caption");
const modalImageCard = document.querySelector("#modal-image-card");
const cardImageModalClose = document.querySelector("#card-image-close");
/* -----------------*/
/*    Functions     */
/* -----------------*/

function openModal(open) {
  open.classList.add("modal__opened");
}

function closeModal(close) {
  close.classList.remove("modal__opened");
}

function openProfileEditForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function profileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}


// sprint5 function //
function toggleCardModal() {
  cardAddModal.classList.toggle("modal__opened");
}
function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function toggleLikeBtn() {
  cardLikeButton.classList.add('card__like-button-toggle')
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  cardTitle.textContent = cardTitleInput.value;
  cardImage.src = cardImageInput.value;
  cardImage.alt = cardImageInput.value;
  closeModal(cardAddModal);
}

function removeCard(e) {
  e.target.closest(".card").remove();
}



function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardRemoveButton = cardElement.querySelector('#card-remove-button');

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_toggle")
  });

  cardRemoveButton.addEventListener("click", removeCard);

  cardImage.addEventListener("click", () => {
    handleCardImageModal(cardData);
  });
  
  cardImage.alt = cardData.title;
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.title;
  return cardElement;
}

function handleCardImageModal(cardData) {
  modalImageCard.src = cardData.link;
  modalImageCard.alt = cardData.title;
  modalCaption.textContent = cardData.title;
  openModal(modalImage);
}

/* ---------------- */
/*  Event Listener  */
/* -----------------*/
profileEditButton.addEventListener('click', openProfileEditForm);
modalClose.addEventListener("click", () => {
  closeModal(profileEditModal)
});
modalForm.addEventListener('submit', profileEditSubmit);


//   sprint5    //

cardAddButton.addEventListener("click", () => {
  openModal(cardAddModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

// click to add card
cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({title, link});
  renderCard(cardView, cardLists);
  closeModal(cardAddModal);
  cardAddForm.reset();
});

cardImageModalClose.addEventListener('click', () => { 
  closeModal(modalImage);
});




/* ------------------ */
/*  Loop to add cards */
/* ------------------ */

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardLists);
});


