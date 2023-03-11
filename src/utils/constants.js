export const ESC_KEYCODE = 27;

export const initialCards = [
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

export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

export const containerSelectors = {
  cardSection: '.cards__list',
  cardTemplate: '#card__template',
  cardPreviewPopup: '#card-modal-image',
  profilePopup: '#profile-eidit-modal',
  cardAddModal: '#card-add-modal',
};

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileTitleInput = document.querySelector('#profile__title-input');
export const profileDescriptionInput = document.querySelector('#profile__description-input');
export const profileEditButton = document.querySelector('.profile__edit');

export const cardAddButton = document.querySelector("#card__add-button");
export const cardTitleInput = document.querySelector("#card__title-input");
export const cardImageInput = document.querySelector("#card__link-input");
