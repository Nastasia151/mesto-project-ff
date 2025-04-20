import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, removeCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js'; // испорт функций открытия и закрытия попапов
import { enableValidation, clearValidation } from './validation.js'; // импорт функции валидации всех инпутов
import {getInitialCards, getUser, patchUser, postCard, patchAvatar } from './API.js';

export const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
const cardsContainer = document.querySelector('.places__list'); // Контейнер с карточки в DOM

// Вывести карточки на страницу
// initialCards.forEach(function (card) {
//   cardsContainer.append(createCard (card, removeCard, likeCard, openImage));
// });
    
// РАБОТА ПОПАПОВ

// функция добавления слушателей для закрытия попапа на
const handleClosePopup = (popupElement) => {
  const closePopupButton = popupElement.querySelector('.popup__close'); // поиск крестика в попапе
   closePopupButton.addEventListener('click', () => {
     closeModal (popupElement);
  });
};

          // ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const editProfilePopup = document.querySelector('.popup_type_edit'); // Попап редактирование профиля в DOM
const editProfileButton = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа редактирования профиля в DOM
const editProfileForm = document.querySelector('.edit-profile__form'); // Форма ввода: изменение данных профиля
const nameInput = editProfileForm.querySelector('.popup__input_type_name');  // Форма ввода Имени пользователя
const jobInput = editProfileForm.querySelector('.popup__input_type_description'); // Форма ввода Деятельности пользователя
const profileTitle = document.querySelector('.profile__title'); // Сохранение в переменную место хранения имени пользователя
const profileDescription = document.querySelector('.profile__description'); // Сохранение в переменную описания деятельности пользователя


editProfileButton.addEventListener('click', () => {  // Слушатель на кнопку редактирования профиля
  nameInput.value = profileTitle.textContent; // Сохраняем в textContent переменной новое Имя из формы заполнения
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup); // вызов функции открытия попапа редактирования профиля
  clearValidation(editProfileForm, validationSettings)
});

handleClosePopup(editProfilePopup); // вызов функции закрыть попап редактирования профиля при клике на крестик

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  
  const submitButton = editProfilePopup.querySelector('.popup__button');
  const buttonText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  
  patchUser(nameInput.value, jobInput.value)
    .then((user) => {
      profileTitle.textContent = user.name; // Сохраняем в textContent переменной новое Имя из формы заполнения
      profileDescription.textContent = user.about; // Сохраняем в textContent переменной новое описание деятельности из формы заполнения
      closeModal(editProfilePopup); // закрыть попап после отпраки данных
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

       // ПОПАП СОЗДАНИЕ НОВОЙ КАРТОЧКИ
const newCardPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки в DOM
const newCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки в DOM
const newCardForm = document.querySelector('.new-place__form'); // Форма ввода: добавление новой карточки
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name'); // Форма ввода наименования карточки
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url'); // Форма ввода ссылки на картинку

newCardButton.addEventListener('click', () => { // Слушатель на кнопку добавления карточки
  openModal(newCardPopup);  // вызов функции открытия попапа добавления карточки
  cardNameInput.value = '';
  cardLinkInput.value = '';
  clearValidation(newCardForm, validationSettings)
});

handleClosePopup(newCardPopup); // вызов функции закрыть попап добавления карточки при клике на крестик

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  
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
      closeModal(newCardPopup); // закрыть попап после отпраки данных
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

const imagePopup = document.querySelector('.popup_type_image'); // Попап редактирование профиля в DOM
const popupImage = imagePopup.querySelector('.popup__image');  // место хранения ссылки на картинкув попапе
const popupCaption = imagePopup.querySelector('.popup__caption');  // место хранения названия картинки в попапе

export function openImage (evt) {  // функция открыть картинку и передать в попап ссылку и название
  const imgElement = evt.target;  // ловим элемент клика
  popupImage.src = imgElement.src;  // сохранение ссылки на картинку из отловленного элемента в попап
  popupImage.alt = imgElement.alt;
  popupCaption.textContent = imgElement.alt;  // сохранение названия картинки из отловленного элемента в попап
  openModal(imagePopup); 
};

handleClosePopup(imagePopup);

// ПОПАП РЕДАКТРРОВАТЬ АВАТАР

const newAvatarButton = document.querySelector('.profile__image-container');
const profileImage = document.querySelector('.profile__image');
const newAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const newAvatarForm = document.querySelector('.edit-avatar__form');
const newAvatarInput = newAvatarForm.querySelector('.popup__input-avatar-link');


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
      // сохранение в переменную созданной карточки
      cardsContainer.append(createCard(cardList, removeCard, likeCard, openImage, userArray._id, card)); // длобавление новой карточки в контейнер
    });
  })
  .catch (err => { 
    console.error(err) 
  })

  export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

  enableValidation(validationSettings);  // валидация