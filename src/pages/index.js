import "./index.css";
// Import all the classes
import 
{ initialCards,
  containerSelectors,
  validationSettings,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  cardAddButton,
} from "../utils/constants";

import Card from "../components/Card";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import FormValidatior from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";




// -------------Create instances for card-Section---------------- //
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card.getView());
    }
  },containerSelectors.cardSection
);


const cardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup);


const cardAddFormPopup = new PopupWithForm({
  popupSelector: containerSelectors.cardAddModal,
  handleFormSubmit : (cardData) => {
   const newCard = createCard(cardData);
   cardSection.addItem(newCard.getView());
  }
});

function createCard(cardData) {
  const cardElement = new Card({
    cardData,
    handleImageClick: (imgData, imgCard) => {
      cardPreviewPopup.open(imgData, imgCard);
    }
  },containerSelectors.cardTemplate);

  return cardElement;
}


// -------Create instances of the classes for others-------- //

const userInfo = new UserInfo({
  nameSelector: "#profile__title-input",
  jobSelector: "#profile__description-input",
});

const profileEditFormPopup = new PopupWithForm({
  popupSelector: containerSelectors.profilePopup, handleFormSubmit: () => {
    userInfo.getUserInfo({
      name : profileTitleInput.value,
      job : profileDescriptionInput.value,
  });
  }}
);

function openProfileEditForm() {
  userInfo.setUserInfo({
    name: (profileTitleInput.value = profileTitle.textContent),
    job: (profileDescriptionInput.value = profileDescription.textContent),
  });
  profileEditFormPopup.open();
}


// ----------Click to Open Modal---------- //
profileEditButton.addEventListener('click', openProfileEditForm);
cardAddButton.addEventListener('click', () => {
  cardAddFormPopup.open();
});


// ------Initialize all my instances------- //

cardSection.renderItems(initialCards);
cardPreviewPopup.setEventListeners();
profileEditFormPopup.setEventListeners();
cardAddFormPopup.setEventListeners();

// ------------Form Validation--------------- //

const editFormElement = document.querySelector('#profile-eidit-modal');
const addFormElement = document.querySelector('#card-add-form');

const editFormValidator = new FormValidatior(validationSettings, editFormElement);
const addFormValidator = new FormValidatior(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

