export const ESC_KEYCODE = 27;

export const BASE_URL = "https://around.nomoreparties.co/v1/group-12";
export const AUTH_TOKEN = "02d7aa0c-331f-4762-a83f-c73224dbaeb3";

export const HEADERS = {
  authorization: AUTH_TOKEN,
  "Content-Type": "application/json",
};

export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const containerSelectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card__template",
  cardPreviewPopup: "#card-modal-image",
  profilePopup: "#profile-eidit-modal",
  cardAddModal: "#card-add-modal",
  cardDeleteModal: "#delet-comfirm-modal",
  editAvatarModal: "#edit-avatar-modal",
};

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector(
  "#profile__title-input"
);
export const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
export const profileEditButton = document.querySelector(".profile__edit");

export const cardAddButton = document.querySelector("#card__add-button");
export const cardTitleInput = document.querySelector("#card__title-input");
export const cardImageInput = document.querySelector("#card__link-input");

export const editAvatarIcon = document.querySelector(".profile__avatar-edit");
