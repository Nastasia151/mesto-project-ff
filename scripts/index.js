// @todo: Темплейт карточки

const content = document.querySelector('.content');
const places = content.querySelector('.places');
const cardsContainer = content.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardTemplate = document.querySelector('#card-template').content;
// const closeButton = document.querySelector('.popup__close');

// function addCard (imageValue, titleValue) {

// // копируем темплейт
// 
// const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

// // наполняем содержимым
// cardElement.querySelector('.card__image').src = imageValue;
// cardElement.querySelector('.card__title').textContent = titleValue;

// // выводим на странице
// cardsContainer.append(cardElement);
// }

// submitButton.addEventListener('click', function () {
//     const image = document.querySelector('.popup__input_type_url');
//     const title = document.querySelector('.popup__input_type_card-name');
    
//     addCard(image.value, title.value);
    
//     image.value = '';
//     title.value = '';
// });

initialCards.forEach(function (element, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__delete-button').button = element.button;
    cardsContainer.append(cardElement);

});




// @todo: DOM узлы

// @todo: Функция создания карточки
// addButton.addEventListener('click', function () {
//     newCardPopup.classList.add('popup_is-opened');
// });


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
