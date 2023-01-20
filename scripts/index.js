const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bold Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];
/* -----------------*/
/*     Variables    */
/* -----------------*/


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



/* -----------------*/
/*    Functions     */
/* -----------------*/

function openProfileModal() {
  profileEditModal.classList.add("modal__opened");
}

function closeProfileModal() {
  profileEditModal.classList.remove("modal__opened");
}

function openProfileEditForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openProfileModal();
}

function profileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeProfileModal();
}


function makeCardElement(cardData) {
  const cardTemplate = cardLists.querySelector('#card__template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  return cardElement;
}

/* ---------------- */
/*  Event Listener  */
/* -----------------*/
profileEditButton.addEventListener('click', openProfileEditForm);
modalClose.addEventListener("click", closeProfileModal);
modalForm.addEventListener('submit', profileEditSubmit);


/* ------------------ */
/*  Loop to add cards */
/* ------------------ */

initialCards.forEach((cardData) => {
  const cardElement = makeCardElement(cardData);
  cardLists.prepend(cardElement);
});