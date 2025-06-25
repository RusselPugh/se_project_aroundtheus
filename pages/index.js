import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const createCard = (cardData) => {
  return new Card(cardData, cardSelector, handleImageClick).getView();
};
// const card = new Card(data, "#card-template");
// card.getView();

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// wrappers
const cardWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardAddModal = document.querySelector("#card-add-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardAddForm = cardAddModal.querySelector(".modal__form");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardAddButton = document.querySelector("#profile-add-button");

// Form data
const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = cardAddForm.querySelector(".modal__input_type_title");
const cardLinkInput = cardAddForm.querySelector(".modal__input_type_link");

const imageModal = document.querySelector("#image-modal");

const modals = document.querySelectorAll(".modal");

const handleEscEvent = (evt, action) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_opened");
    action(activePopup);
  }
};

const imageEl = imageModal.querySelector(".modal__image-preview");
const imageName = imageModal.querySelector(".modal__image-preview-name");

const handleEscUp = (evt) => {
  evt.preventDefault();
  handleEscEvent(evt, closePopup);
};

const handleLikeButton = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

const handleTrashButton = (evt) => {
  evt.target.closest(".card").remove();
};

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  //const cardElement = new Card(cardData, cardSelector, handleImageClick).getView();
  wrapper.prepend(cardElement);
}

// function disableButton(submitButton, validationSettings) {
//   submitButton.classList.add(validationSettings.inactiveButtonClass);
//   submitButton.disabled = true;
// }

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  const button = evt.target.querySelector(".modal__save-button");
  closePopup(profileEditModal);
}

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const button = evt.target.querySelector(".modal__save-button");
  renderCard({ name, link }, cardWrap);
  closePopup(cardAddModal);
  //disableButton(button, validationSettings);
  cardAddFormValidator.resetValidation();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");
  cardImageEl.addEventListener("click", () => {
    openPopup(imageModal);
    imageEl.src = cardData.link;
    imageEl.alt = cardData.name;
    imageName.textContent = cardData.name;
  });
  const handleImageClick = () => {
    openPopup(imageModal);
    imageEl.src = cardData.link;
    imageEl.alt = cardData.name;
    imageName.textContent = cardData.name;
  };
  cardImageEl.addEventListener("click", handleImageClick);
  trashButton.addEventListener("click", handleTrashButton);
  likeButton.addEventListener("click", handleLikeButton);

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);
profileEditButton.addEventListener("click", () => {
  profileEditFormValidator.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target === modal ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closePopup(modal);
    }
  });
});

// Add new card
cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
  cardAddFormValidator.resetValidation();
});

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
