import "./index.css";
// Import all the classes
import 
{ initialCards,
  containerSelectors,
  validationSettings,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  cardAddButton,
} from "../utils/constants";

import Card from "../components/Card";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
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
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profileEditFormPopup = new PopupWithForm({
  popupSelector: containerSelectors.profilePopup,
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values)
  }}
);

// function openProfileEditForm() {
//   userInfo.setUserInfo({ 

//     name: (profileTitleInput.value = profileTitle.textContent), 

//     job: (profileDescriptionInput.value =profileDescription.textContent)
//   })
//   profileEditFormPopup.open();
// }

const fillProfileForm = ({name, job}) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
}

// ----------Click to Open Modal---------- //
profileEditButton.addEventListener('click', () => {
  const { name, job} = userInfo.getUserInfo();
  fillProfileForm({name , job});
  profileEditFormPopup.open();
});

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

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

