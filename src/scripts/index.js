import '../pages/index.css';

import {initialCards} from './cards.js';


export const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки

const cardsContainer = document.querySelector('.places__list'); // Контейнер с карточки в DOM

// Функция удаления карточки
export const removeCard = (card) => {
  card.remove();
};

// Функция лайка карточки
export const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

import { createCard } from '../components/card.js'; // Импорт функции создания карточки

// Вывести карточки на страницу

initialCards.forEach(function (card) {
  cardsContainer.append(createCard (card, removeCard, likeCard, open));
});
    
// РАБОТА ПОПАПОВ

import { openModal, closeModal, handleOverlayClick } from '../components/modal.js'; // испорт функций открытия и закрытия попапов

// функция добавления слушателей для закрытия попапа на
const closeModalListeners = (popupElement) => {
  // на крестик 
  const popupClose = popupElement.querySelector('.popup__close'); // поиск крестика в попапе
  popupClose.addEventListener('click', () => {
    closeModal (popupElement);
  });
  // на оверлей
  popupElement.addEventListener('mousedown', handleOverlayClick);
};

          // ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const editProfilePopup = document.querySelector('.popup_type_edit'); // Попап редактирование профиля в DOM
const editProfileButton = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа редактирования профиля в DOM

editProfileButton.addEventListener('click', () => {  // Слушатель на кнопку редактирования профиля
  openModal(editProfilePopup); // вызов функции открытия попапа редактирования профиля
});

closeModalListeners(editProfilePopup); // вызов функции закрытия попапа редактирования через клик по крестикам и оверлею

const formElementProfile = document.querySelector('.edit-profile__form'); // Форма ввода: изменение данных профиля

const nameInput = formElementProfile.querySelector('.popup__input_type_name');  // Форма ввода Имени пользователя
const jobInput = formElementProfile.querySelector('.popup__input_type_description'); // Форма ввода Деятельности пользователя

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  const profileTitle = document.querySelector('.profile__title'); // Сохранение в переменную место хранения имени пользователя
  const profileDescription = document.querySelector('.profile__description'); // Сохранение в переменную описания деятельности пользователя
  profileTitle.textContent = nameInput.value; // Сохраняем в textContent переменной новое Имя из формы заполнения
  profileDescription.textContent = jobInput.value; // Сохраняем в textContent переменной новое описание деятельности из формы заполнения
  closeModal(editProfilePopup); // закрыть попап после отпраки данных
  nameInput.value = "";
  jobInput.value = "";
};

formElementProfile.addEventListener('submit', handleFormProfileSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

       // ПОПАП СОЗДАНИЕ НОВОЙ КАРТОЧКИ
const newCardPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки в DOM
const newCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки в DOM
newCardButton.addEventListener('click', () => { // Слушатель на кнопку добавления карточки
  openModal(newCardPopup);  // вызов функции открытия попапа добавления карточки
});

closeModalListeners(newCardPopup); // вызов функции закрытия попапа добавления через клик по крестикам и оверлею

const formElementCard = document.querySelector('.new-place__form'); // Форма ввода: добавление новой карточки

const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name'); // Форма ввода наименования карточки
const cardLinkInput = formElementCard.querySelector('.popup__input_type_url'); // Форма ввода ссылки на картинку
 
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  const card = { // создание объекта карточки
    name: cardNameInput.value,   // сохранение в ключ имя значения из поля ввода наименование карточки
    link: cardLinkInput.value    // сохранение в ключ ссылка значени из поля ввода ссылка на картчоку
  };
  const newCard = createCard(card, removeCard, likeCard, open); // сохранение в переменную созданной карточки
  cardsContainer.prepend(newCard); // длобавление новой карточки в контейнер
  closeModal(newCardPopup); // вызов функции закрыть попап после сохранения
  cardNameInput.value = '';
  cardLinkInput.value = ''; 
};
    
formElementCard.addEventListener('submit', handleCardFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

        // ПОПАП ОТКРЫТЬ ИЗОБРАЖЕНИЕ

export const imagePopup = document.querySelector('.popup_type_image'); // Попап изображения в DOM

export const showImagePopup = (evt) => {
  openModal(imagePopup);
  const imgElement = evt.target;
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = imgElement.src;

};

export function open (evt) {
  const imgElement = evt.target;
  console.log(imgElement);
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = imgElement.src;
  popupCaption.textContent = imgElement.alt;

  openModal(imagePopup);
};

closeModalListeners(imagePopup);
