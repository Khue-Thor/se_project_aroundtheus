const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bold Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Variables */

const profileEditButton = document.querySelector('.profile__edit');
const profileEditModal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile__title-input');
const profileDescriptionInput = document.querySelector('#profile__description-input');
const submitButton = document.querySelector('.modle__form_save');


// Functions

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

// Event Listener

profileEditButton.addEventListener('click', openProfileEditForm);
modalClose.addEventListener("click", closeProfileModal);
submitButton.addEventListener("submit", profileEditSubmit);