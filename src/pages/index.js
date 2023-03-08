import "./index.css";
// Import all the classes
import 
{ initialCards,
  containerSelectors,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton
} from "../utils/constants";
import FormValidatior from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import Popup from "../components/Popup";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/popupWithForm";
import UserInfo from "../components/UserInfo";


// Create instances of the classes


const CardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup);


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

const userInfo = new UserInfo({
  nameSelector: "#profile__title-input",
  jobSelector: "#profile__description-input",
});

// function>>>>>>>>>>> //

function openProfileEditForm() {
  userInfo.setUserInfo({
    name: (profileTitleInput.value = profileTitle.textContent),
    job: (profileDescriptionInput.value =profileDescription.textContent),
  });
 profileFormPopup.open(containerSelectors.profileFormPopup);
}

function submitEditProfile() {
  userInfo.setUserInfo({
    name: (profileTitle.textContent =profileTitleInput.value),
    job: (profileDescription.textContent = profileDescriptionInput.value),
  });
  profileFormPopup.close(modalEditProfile);
}
const profileFormPopup = new Popup(containerSelectors.profileFormPopup);
const profileEditForm = new PopupWithForm({
  popupSelector: containerSelectors.profileFormPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: (profileTitle.textContent =profileTitleInput.value),
      job: (profileDescription.textContent = profileDescriptionInput.value),
    });
  }
  
});




// Initialize all my instances

cardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();


profileEditButton.addEventListener('click', openProfileEditForm);
profileFormPopup.setEventListeners();
profileEditForm.setEventListeners();
// cardAddForm._setEventListeners();

// Form Validation //
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



// All the rest