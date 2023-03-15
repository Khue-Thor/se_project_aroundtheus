import "./index.css";

// Import all the classes
import initialCards,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation";

// ---------------- Create API instances ------------------ //

const api = new Api({
  baseUrl: BASE_URL,
  authToken: AUTH_TOKEN,
  headers: HEADERS,
});


// -------------Create instances for card-Section---------------- //
function createCard(cardData, userId) {
  const card = new Card({
    cardData: cardData,
    userId: userId,
    handleImageClick: () => {
      cardPreviewPopup.open(cardData);
    },
    handleDeleteClick: () => {
      const id = card.getCardId();
      comfirmationPopup.open();
      comfirmationPopup.setSubmitAction(() => {
        comfirmationPopup.renderLoading(true);
        api.deleteCardById(id)
        .then(() => {
          card.removeCard();
          comfirmationPopup.close();
        })
        .catch((err) => console.error(err))
        .finally(() => comfirmationPopup.renderLoading(false));
      });
      
    },
    handleCardLikes: () => {
      api
      .changeCardLikeStatus(card.getCardId(), !card.isLiked())
        .then((response) => {
          card.setLikes(response.likes);
        })
        .catch((err) => console.error(err));
    },
  },containerSelectors.cardTemplate);

  return card.getView();
}

let cardSection;

// const cardSection = new Section(
//   {
//     renderer: (cardData) => {
     
//       const card = createCard(cardData);
//       cardSection.addItem(card);
//     }
//   },containerSelectors.cardSection
// );

api.getAppInfo()
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      name: user.name,
     description: user.about,
    });
    

    const userId = user._id;
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const card = createCard(cardData, userId);
          cardSection.addItem(card);
        },
    }, containerSelectors.cardSection);
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });


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

const comfirmationPopup = new PopupWithConfirmation(containerSelectors.cardDeleteModal)



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

// api.getInitialCards().then(cards => {
//   cardSection.renderItems(cards);
// })


cardPreviewPopup.setEventListeners();
profileEditFormPopup.setEventListeners();
cardAddFormPopup.setEventListeners();
comfirmationPopup.setEventListeners();






// ------------Form Validation--------------- //

const editFormElement = document.querySelector('#profile-eidit-modal');
const addFormElement = document.querySelector('#card-add-form');

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();


// ---things to do--- //

// 1. need to make the delete card modal close Worker : Y
// 2. bring the card titles back : Y
// 3. change the like button status: Y
// 4. edit profile avatar modal: N