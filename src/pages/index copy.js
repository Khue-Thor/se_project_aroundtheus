import "./index.css";

import FormValidatior from "../components/FormValidator";
import Card from "../components/Card";
import { openModal, closeModal } from "../components/utils";

const initialCards = [
  {
    title: "Wetterhorn",
    link: "https://images.unsplash.com/photo-1567017469553-d1b219af5831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3dpdHplcmxhbmQlMjBtb3VudGFpbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Laguna beach",
    link: "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BsYXNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "New York City",
    link: "https://images.unsplash.com/photo-1671831817096-7e635d113260?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Secedas",
    link: "https://images.unsplash.com/photo-1671644100358-5ea38e1b1885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NzZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Avatar Mountains",
    link: "https://images.unsplash.com/photo-1567266565245-c08dc046815f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbmVzZSUyMG1vdW50YWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];
/* -----------------*/
/*     Variables    */
/* -----------------*/
const profileEditButton = document.querySelector(".profile__edit");
const profileEditModal = document.querySelector("#profile-eidit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile__title-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
const profileForm = document.querySelector(".modal__form");

const cardsContainer = document.querySelector(".cards");
const cardLists = cardsContainer.querySelector(".cards__list");

const cardAddButton = document.querySelector("#card__add-button");
const cardAddModal = document.querySelector("#card-add-modal");

const cardAddForm = document.querySelector("#card-add-form");

const cardTitleInput = document.querySelector("#card__title-input");
const cardImageInput = document.querySelector("#card__link-input");

const closeButtons = document.querySelectorAll(".modal__close");

const cardModalImage = document.querySelector("#card-modal-image");
/* -----------------*/
/*    Functions     */
/* -----------------*/

function openProfileEditForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// sprint5 function //

function renderCard(cardData) {
  const card = new Card(cardData, "#card__template").getView();
  cardLists.prepend(card);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  renderCard({ title, link }, cardLists);
  closeModal(cardAddModal);
  cardTitleInput.value = "";
  cardImageInput.value = "";
  cardAddForm.reset();
}

function handleCardClick() {
  openModal(cardModalImage);
}
/* The Old Functions */

// function toggleLikeBtn() {
//   cardLikeButton.classList.add('card__like-button-toggle')
// }

// function removeCard(e) {
//   e.target.closest(".card").remove();
// }

// function getCardView(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const cardLikeButton = cardElement.querySelector('.card__like-button');
//   const cardRemoveButton = cardElement.querySelector('#card-remove-button');

//   cardLikeButton.addEventListener("click", () => {
//     cardLikeButton.classList.toggle("card__like-button_toggle")
//   });

//   cardRemoveButton.addEventListener("click", removeCard);

//   cardImage.addEventListener("click", () => {
//     handleCardImageModal(cardData);
//   });

//   cardImage.alt = cardData.title;
//   cardImage.src = cardData.link;
//   cardTitle.textContent = cardData.title;
//   return cardElement;
// }

// function handleCardImageModal(cardData) {
//   modalImageCard.src = cardData.link;
//   modalImageCard.alt = cardData.title;
//   modalCaption.textContent = cardData.title;
//   openModal(modalImage);
// }

/* ---------------- */
/*  Event Listener  */
/* -----------------*/
profileEditButton.addEventListener("click", openProfileEditForm);

profileForm.addEventListener("submit", handleProfileEditSubmit);

// click to open AddCardModal
cardAddButton.addEventListener("click", () => {
  openModal(cardAddModal);
});

// click to add card
cardAddForm.addEventListener("submit", handleAddCardSubmit);

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".modal");
  // set the listener
  button.addEventListener("click", () => closeModal(popup));
});

/* ------------------ */
/*  Loop to add cards */
/* ------------------ */

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsContainer);
});

/* -------------------------------------- */
/*               Validation               */
/* -------------VVVVVVVVVV--------------- */

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = cardAddModal.querySelector(".modal__form");

const editFormValidator = new FormValidatior(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidatior(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export { handleCardClick };
