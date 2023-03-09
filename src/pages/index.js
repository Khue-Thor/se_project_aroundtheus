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
} from "../utils/constants";

import Card from "../components/Card";
import Popup from "../components/Popup";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/popupWithForm";
import FormValidatior from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";


// ------------Form Validation--------------- //
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const editFormElement = document.querySelector('.modal__form');
const addFormElement = document.querySelector('.modal__form');

const editFormValidator = new FormValidatior(validationSettings, editFormElement);
const addFormValidator = new FormValidatior(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();



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


// Create instances of the classes



const userInfo = new UserInfo({
  nameSelector: "#profile__title-input",
  jobSelector: "#profile__description-input",
});

// ----------------function--------------//

function openProfileEditForm() {
  userInfo.setUserInfo({
    name: (profileTitleInput.value = profileTitle.textContent),
    job: (profileDescriptionInput.value =profileDescription.textContent),
  });
 profilePopup.open();
}

function submitEditProfile(e) {
  e.preventDefault();
  userInfo.getUserInfo({
    name: (profileTitle.textContent =profileTitleInput.value),
    job: (profileDescription.textContent = profileDescriptionInput.value),
  });
  profilePopup.close();
}



// cardAddButton.addEventListener("click", )





// --------------Popup--------------- //

const CardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup);

const profilePopup = new Popup(containerSelectors.profilePopup);
const profileEditForm = new PopupWithForm({
  popupSelector: containerSelectors.profilePopup, handleFormSubmit: (e) => {
    submitEditProfile(e);
  }}
);

const cardAddModal = new Popup(containerSelectors.cardAddModal);
cardAddModal.setEventListeners()

// ------Initialize all my instances------- //

cardSection.renderItems(initialCards);


CardPreviewPopup.setEventListeners();


profileEditButton.addEventListener('click', openProfileEditForm);
profilePopup.setEventListeners();
profileEditForm.setEventListeners();

// cardAddButton.addEventListener('click', cardAddModal.open());