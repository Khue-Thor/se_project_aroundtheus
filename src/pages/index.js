import "./index.css";

// Import all the classes
import
{ containerSelectors,
  validationSettings,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  cardAddButton,
  editAvatarIcon,
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

// ----------- Form Validator Variables ------------- //

const editFormElement = document.querySelector('#profile-eidit-modal');
const addFormElement = document.querySelector('#card-add-form');
const editAvatarElement = document.querySelector('#edit-avatar-modal')

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);
const editAvatarFormValidator = new FormValidator(validationSettings, editAvatarElement);

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

api.getAppInfo()
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      name: user.name,
      about : user.about,
    });

    const avatar = user.avatar;
    userInfo.setAvatar(avatar);
    

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
  avatarSelector: ".profile__avatar"
});

const fillProfileForm = ({name, about}) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
}

const profileEditFormPopup = new PopupWithForm({
  popupSelector: containerSelectors.profilePopup,
  handleFormSubmit: (data) => {
    api.editUserInfo(data)
      .then(userData =>{
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar
        });
      })
      .catch((err) => console.error(err))
  }}
);


const avatarFormModal = new PopupWithForm({
  popupSelector: containerSelectors.editAvatarModal,
  handleFormSubmit: (avatar) => {
    api.setUserAvatar(avatar)
      .then((avatar) => {
        userInfo.setAvatar(avatar);        
      })
      .catch((err) => {
        console.log(err)
      })
  }
});


// ----------Click to Open Modal---------- //

profileEditButton.addEventListener('click', () => {
  const { name, about} = userInfo.getUserInfo();
  fillProfileForm({name , about});
  profileEditFormPopup.open();
});

cardAddButton.addEventListener('click', () => {
  cardAddFormPopup.open();
});

editAvatarIcon.addEventListener('click', () => {
  avatarFormModal.open()
})



// ------Initialize all my instances------- //


cardPreviewPopup.setEventListeners();
profileEditFormPopup.setEventListeners();
cardAddFormPopup.setEventListeners();
comfirmationPopup.setEventListeners();
avatarFormModal.setEventListeners();


// ------------Form Validation--------------- //


editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();


// 1. make edit profile form works: N