import "./index.css";
// Import all the classes
import 
{ containerSelectors,
  validationSettings,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  cardAddButton,
  BASE_URL,
  AUTH_TOKEN,
  HEADERS
} from "../utils/constants";

import Api from "../components/Api";
import Card from "../components/Card";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";

// ---------------- Create API instances ------------------ //

const api = new Api({
  baseUrl: BASE_URL,
  authToken: AUTH_TOKEN,
  headers: HEADERS,
});


// -------------Create instances for card-Section---------------- //
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    }
  },containerSelectors.cardSection
);


const cardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup);


const cardAddFormPopup = new PopupWithForm({
  popupSelector: containerSelectors.cardAddModal,
  handleFormSubmit: (cardData) => {
   api.addCard(cardData)
      .then((cardData) => {
        const newCard = createCard(cardData); 
        cardSection.addItem(newCard); 
      })
      .catch((err) => console.log(err))
  }
});


function createCard(cardData) {
  const cardElement = new Card({
    cardData,
    handleImageClick: () => {
      cardPreviewPopup.open(cardData);
    }
  },containerSelectors.cardTemplate);

  return cardElement.getView();
}


// -------Create instances of the classes for others-------- //

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

api.getUserInfo()
  .then(userData =>{
    userInfo.setUserInfo({
      name: userData.name,
     description: userData.about
    })
  })


const profileEditFormPopup = new PopupWithForm({
  popupSelector: containerSelectors.profilePopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
  }}
);

// function submitEditProfile(name) {
//   userInfo.setUserInfo({name});
//   debugger
// }

const fillProfileForm = ({name, description}) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
}

// ----------Click to Open Modal---------- //
profileEditButton.addEventListener('click', () => {
  const { name, description} = userInfo.getUserInfo();
  fillProfileForm({name , description});
  profileEditFormPopup.open();
});

cardAddButton.addEventListener('click', () => {
  cardAddFormPopup.open();
});


// ------Initialize all my instances------- //

api.getInitialCards().then(cards => {
  cardSection.renderItems(cards);
})

  // api.getInitialCards()
  // .then(cards => {
  //   console.log(cards)
  // })

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



// function getUserInfo() {
//   return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
//     headers: HEADERS
//   })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 
// }

// getUserInfo()


