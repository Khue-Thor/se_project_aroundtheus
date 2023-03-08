import "./index.css";
// Import all the classes
import { initialCards, containerSelectors } from "../utils/constants";
import FormValidatior from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";

// Create instances of the classes
const CardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup)


// const cardSection = new Section(
//   {
//   renderer: (data) => {
//     const cardElement = new Card(
//       {
//         data,
//         handleImageClick: (imgData) => {
//           CardPreviewPopup.open(imgData);
//         },
//       }, 
//       containerSelectors.cardTemplate);
//     cardSection.addItem(cardElement.getView());
//   },
//   },containerSelectors.cardSection
// );

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardElement = new Card(
        data,
        containerSelectors.cardTemplate,
      )
      cardSection.addItem(cardElement.getView());
    }
  }, containerSelectors.cardSection
)

cardSection.renderItems(initialCards);

CardPreviewPopup._setEventListeners()






// Initialize all my instances









// All the rest