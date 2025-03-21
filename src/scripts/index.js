import {initialCards} from './cards.js';
import '../pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки

function addCard (article, removeArticle) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = article.name;
    cardElement.querySelector('.card__image').src = article.link;
    cardElement.querySelector('.card__image').alt = article.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function () {
       removeArticle(cardElement);
    });

    return cardElement;
}

// @todo: Функция удаления карточки

function removeArticle (article) {
    article.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach( function (article) {
    cardsContainer.append(addCard (article, removeArticle));
});
    




// const addButton = document.querySelector('.profile__add-button');
// const submitButton = document.querySelector('.popup__button');
// const newCardPopup = document.querySelector('.popup_type_new-card');

// addButton.addEventListener('click', function () {
//     newCardPopup.classList.add('popup_is-opened');
// });
