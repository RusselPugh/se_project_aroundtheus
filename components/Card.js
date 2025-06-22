const imageModal = document.querySelector("#image-modal");
const imageEl = imageModal.querySelector(".modal__image-preview");
const imageName = imageModal.querySelector(".modal__image-preview-name");

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

const handleEscUp = (evt) => {
  evt.preventDefault();
  handleEscEvent(evt, closePopup);
};

const handleEscEvent = (evt, action) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_opened");
    action(activePopup);
  }
};

//Above code is temporary

class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashButton();
      });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    imageEl.src = cardData.link;
    imageEl.alt = cardData.name;
    imageName.textContent = cardData.name;
    openPopup(imageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._setEventListeners();
    this._handleLikeButton();
    this._handleTrashButton();
  }
}

export default Card;
