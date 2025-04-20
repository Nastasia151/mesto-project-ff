import '../pages/index.css';
import { createCard, likeCard, removeCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js'; // испорт функций открытия и закрытия попапов
import { enableValidation, clearValidation } from '../components/validation.js'; // импорт функции валидации всех инпутов
import { getInitialCards, getUser, patchUser, postCard, patchAvatar } from '../components/api.js';

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const editProfileButton = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа редактирования профиля в DOM
const newAvatarButton = document.querySelector('.profile__image-container');
const newCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки в DOM

// ПОПАПЫ
const editProfilePopup = document.querySelector('.popup_type_edit'); // Попап редактирование профиля в DOM
const newAvatarPopup = document.querySelector('.popup_type_edit-avatar'); // Попап редактировать аватар
const newCardPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки в DOM
const imagePopup = document.querySelector('.popup_type_image'); // Попап открыть картинку в DOM

// Попап картинки
const popupImage = imagePopup.querySelector('.popup__image');  // место хранения ссылки на картинкув попапе
const popupCaption = imagePopup.querySelector('.popup__caption');  // место хранения названия картинки в попапе

// Формы

// Изменение данных пользователя
const editProfileForm = document.querySelector('.edit-profile__form'); // Форма ввода: изменение данных профиля
const nameInput = editProfileForm.querySelector('.popup__input_type_name');  // Именя пользователя
const jobInput = editProfileForm.querySelector('.popup__input_type_description'); // Деятельность пользователя

// Изменение аватара пользователя
const newAvatarForm = document.querySelector('.edit-avatar__form'); // Форма нового аватара
const newAvatarInput = newAvatarForm.querySelector('.popup__input-avatar-link'); // Ссылка на новый аватар

// Добавление поста
const newCardForm = document.querySelector('.new-place__form'); // Форма ввода: добавление новой карточки
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name'); // Наименование карточки
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url'); // Ссылка на картинку

// ПОЛЯ отображения данных 

// Данных профиля
const profileTitle = document.querySelector('.profile__title'); // Имя пользователя
const profileDescription = document.querySelector('.profile__description'); // Описание профиля
const profileImage = document.querySelector('.profile__image'); // Аватар пользователя

// Постов
export const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
const cardsContainer = document.querySelector('.places__list'); // Контейнер с карточки в DOM

// функция добавления слушателей для закрытия попапа на крестик
const handleClosePopup = (popupElement) => {
  const closePopupButton = popupElement.querySelector('.popup__close'); // поиск крестика в попапе
   closePopupButton.addEventListener('click', () => {
     closeModal (popupElement);
  });
};

          // ОБРАБОТКА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
  clearValidation(editProfileForm, validationSettings);
});

handleClosePopup(editProfilePopup); // вызов функции закрыть попап редактирования профиля при клике на крестик

// Обработчик «отправки» формы
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); 
  const submitButton = editProfilePopup.querySelector('.popup__button');
  const buttonText = submitButton.textContent; 
  submitButton.textContent = 'Сохранение...'; 
  submitButton.disabled = true; 
  patchUser(nameInput.value, jobInput.value)
    .then((user) => {
      profileTitle.textContent = user.name; // данные с сервера
      profileDescription.textContent = user.about;
      closeModal(editProfilePopup);
      editProfileForm.reset();
    })
    .catch (err => { 
      console.error(err)
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = buttonText;
    })
};

editProfileForm.addEventListener('submit', handleFormProfileSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

newAvatarButton.addEventListener('click', function () {
  openModal(newAvatarPopup);
  newAvatarForm.reset();
  clearValidation(newAvatarForm, validationSettings);
});

handleClosePopup(newAvatarPopup);

function avatarFormSubmit (evt) {
  evt.preventDefault();
  const submitButton = newAvatarPopup.querySelector('.popup__button');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  patchAvatar(newAvatarInput.value)
    .then(function(res) {
      profileImage.src = res['avatar'];
      closeModal(newAvatarPopup);
      newAvatarForm.reset();
    })
    .catch (err => { 
      console.error(err)
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = buttonText;
    })
}

newAvatarForm.addEventListener('submit', avatarFormSubmit);

       // СОЗДАНИЕ НОВОЙ КАРТОЧКИ

newCardButton.addEventListener('click', () => { 
  openModal(newCardPopup);
  newCardForm.reset();
  clearValidation(newCardForm, validationSettings)
});

handleClosePopup(newCardPopup);

// Обработчик «отправки» формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = newCardPopup.querySelector('.popup__button');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  postCard(cardNameInput.value, cardLinkInput.value)
    .then((card) => {
      const newCard = {
        name: card.name,
        alt: card.name,
        link: card.link
      }
       cardsContainer.prepend(createCard(newCard, removeCard, likeCard, openImage, card.owner._id, card));
    })
    .then(function () {
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch (err => { 
      console.error(err)
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = buttonText;
    })
};

newCardForm.addEventListener('submit', handleCardFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

        // ПОПАП ОТКРЫТЬ ИЗОБРАЖЕНИЕ

export function openImage (evt) {
  const imgElement = evt.target;
  popupImage.src = imgElement.src;
  popupImage.alt = imgElement.alt;
  popupCaption.textContent = imgElement.alt;
  openModal(imagePopup);
};

handleClosePopup(imagePopup);

// Загрузить с сервера карточки и данные пользователя
Promise.all([getInitialCards(), getUser()])
  .then(([cardArray, userArray]) => {
    console.log(cardArray);
    console.log(userArray);
    profileTitle.textContent = userArray.name;
    profileDescription.textContent = userArray.about;
    profileImage.src = userArray.avatar;
    cardArray.forEach(function (card) {
      const cardList = {
        name: card.name,
        alt: card.name,
        link: card.link
      };
      cardsContainer.append(createCard(cardList, removeCard, likeCard, openImage, userArray._id, card)); // длобавление новой карточки в контейнер
    });
  })
  .catch (err => { 
    console.error(err)
  })

// Настройки и вызов функции валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(validationSettings);