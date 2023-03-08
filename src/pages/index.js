import "./index.css";
// Import all the classes
import { initialCards, containerSelectors } from "../utils/constants";
import FormValidatior from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";

// Create instances of the classes
const CardPreviewPopup = new PopupWithImage(containerSelectors.cardPreviewPopup)


const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardEl = new Card({cardData, handleImageClick: (imgData) => {
        CardPreviewPopup.open(imgData);
      }},containerSelectors.cardTemplate);
      cardSection.addItem(cardEl.getView());
    },
  },containerSelectors.cardSection
  
)

cardSection.renderItems(initialCards);
CardPreviewPopup._setEventListeners()







// Initialize all my instances









// All the rest