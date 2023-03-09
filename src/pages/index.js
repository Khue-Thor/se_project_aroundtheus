import "./index.css";
// Import all the classes
import 
{ initialCards,
  containerSelectors,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  cardAddButton,
  cardTitleInput,
  cardImageInput
} from "../utils/constants";

import Card from "../components/Card";
import Popup from "../components/Popup";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import FormValidatior from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";




// -------------card-Section---------------- //
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardEl = new Card({cardData, handleImageClick: (imgData, imgCard) => {
        CardPreviewPopup.open(imgData, imgCard);
      }},containerSelectors.cardTemplate);
      cardSection.addItem(cardEl.getView());
    },
  },containerSelectors.cardSection
  
);


const CardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup);


const cardAddPopup = new Popup(containerSelectors.cardAddModal);
const cardAddForm = new PopupWithForm({
  popupSelector: containerSelectors.cardAddModal,
  handleFormSubmit : (cardData) => {
    const card = new Card({cardData, handleImageClick: (title, image) => {
      CardPreviewPopup.open(title, image);
    }},containerSelectors.cardTemplate);
    cardSection.addItem(card.getView())
  }
});


// const cardsContainer = document.querySelector('.cards');
// const cardLists = cardsContainer.querySelector('.cards__list');


// function submitAddCard(e) {
//   const title = cardTitleInput.value;
//   const link = cardImageInput.value;
//   const card = cardSection;
//   cardLists.prepend(card);
// }



// Create instances of the classes

const userInfo = new UserInfo({
  nameSelector: "#profile__title-input",
  jobSelector: "#profile__description-input",
});


const profilePopup = new Popup(containerSelectors.profilePopup);
const profileEditForm = new PopupWithForm({
  popupSelector: containerSelectors.profilePopup, handleFormSubmit: (name, job) => {
    userInfo.getUserInfo({
      name: (profileTitle.textContent =profileTitleInput.value),
      job: (profileDescription.textContent = profileDescriptionInput.value),
    });
  }}
);

function openProfileEditForm() {
  userInfo.setUserInfo({
    name: (profileTitleInput.value = profileTitle.textContent),
    job: (profileDescriptionInput.value =profileDescription.textContent),
  });
 profilePopup.open();
}

function openCardAddForm() {
 cardAddPopup.open();
}

profileEditButton.addEventListener('click', openProfileEditForm);
cardAddButton.addEventListener('click', openCardAddForm);
// ------Initialize all my instances------- //

cardSection.renderItems(initialCards);


CardPreviewPopup.setEventListeners();



profilePopup.setEventListeners();
profileEditForm._setEventListeners();


cardAddPopup.setEventListeners();
cardAddForm._setEventListeners();

// ------------Form Validation--------------- //

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};
const editFormElement = document.querySelector('#profile-eidit-modal');
const addFormElement = document.querySelector('#card-add-form');

const editFormValidator = new FormValidatior(validationSettings, editFormElement);
const addFormValidator = new FormValidatior(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

