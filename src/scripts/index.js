import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, removeCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js'; // испорт функций открытия и закрытия попапов

export const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
const cardsContainer = document.querySelector('.places__list'); // Контейнер с карточки в DOM

// Вывести карточки на страницу
initialCards.forEach(function (card) {
  cardsContainer.append(createCard (card, removeCard, likeCard, openImage));
});
    
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
const formElementProfile = document.querySelector('.edit-profile__form'); // Форма ввода: изменение данных профиля
const nameInput = formElementProfile.querySelector('.popup__input_type_name');  // Форма ввода Имени пользователя
const jobInput = formElementProfile.querySelector('.popup__input_type_description'); // Форма ввода Деятельности пользователя
const profileTitle = document.querySelector('.profile__title'); // Сохранение в переменную место хранения имени пользователя
const profileDescription = document.querySelector('.profile__description'); // Сохранение в переменную описания деятельности пользователя

editProfileButton.addEventListener('click', () => {  // Слушатель на кнопку редактирования профиля
  nameInput.value = profileTitle.textContent; // Сохраняем в textContent переменной новое Имя из формы заполнения
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup); // вызов функции открытия попапа редактирования профиля
});

handleClosePopup(editProfilePopup); // вызов функции закрыть попап редактирования профиля при клике на крестик

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  profileTitle.textContent = nameInput.value; // Сохраняем в textContent переменной новое Имя из формы заполнения
  profileDescription.textContent = jobInput.value; // Сохраняем в textContent переменной новое описание деятельности из формы заполнения
  closeModal(editProfilePopup); // закрыть попап после отпраки данных
};

formElementProfile.addEventListener('submit', handleFormProfileSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

       // ПОПАП СОЗДАНИЕ НОВОЙ КАРТОЧКИ
const newCardPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки в DOM
const newCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки в DOM
const formElementCard = document.querySelector('.new-place__form'); // Форма ввода: добавление новой карточки
const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name'); // Форма ввода наименования карточки
const cardLinkInput = formElementCard.querySelector('.popup__input_type_url'); // Форма ввода ссылки на картинку

newCardButton.addEventListener('click', () => { // Слушатель на кнопку добавления карточки
  openModal(newCardPopup);  // вызов функции открытия попапа добавления карточки
});

handleClosePopup(newCardPopup); // вызов функции закрыть попап добавления карточки при клике на крестик

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  const card = { // создание объекта карточки
    name: cardNameInput.value,   // сохранение в ключ имя значения из поля ввода наименование карточки
    link: cardLinkInput.value    // сохранение в ключ ссылка значени из поля ввода ссылка на картчоку
  };
  const newCard = createCard(card, removeCard, likeCard, openImage); // сохранение в переменную созданной карточки
  cardsContainer.prepend(newCard); // длобавление новой карточки в контейнер
  closeModal(newCardPopup); // вызов функции закрыть попап после сохранения
  cardNameInput.value = '';
  cardLinkInput.value = ''; 
};

formElementCard.addEventListener('submit', handleCardFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

        // ПОПАП ОТКРЫТЬ ИЗОБРАЖЕНИЕ

const imagePopup = document.querySelector('.popup_type_image'); // Попап редактирование профиля в DOM
const popupImage = imagePopup.querySelector('.popup__image');  // место хранения ссылки на картинкув попапе
const popupCaption = imagePopup.querySelector('.popup__caption');  // место хранения названия картинки в попапе

export function openImage (evt) {  // функция открыть картинку и передать в попап ссылку и название
  let imgElement = evt.target;  // ловим элемент клика
  popupImage.src = imgElement.src;  // сохранение ссылки на картинку из отловленного элемента в попап
  popupImage.alt = imgElement.alt;
  popupCaption.textContent = imgElement.alt;  // сохранение названия картинки из отловленного элемента в попап
  openModal(imagePopup); 
};

handleClosePopup(imagePopup);