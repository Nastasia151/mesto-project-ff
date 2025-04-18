import { cardTemplate } from '../scripts/index.js';
import { deleteCard, putLike, deleteLike } from '../scripts/API.js';

// @todo: Функция создания карточки

export const createCard = (card, removeCard, likeCard, openImage, myID, item) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем темплейт
    
    const cardName = cardElement.querySelector('.card__title'); // тайтл карточки в темплейте
    const cardImage = cardElement.querySelector('.card__image');  // картинка в темплейте
    const cardImageName = cardElement.querySelector('.card__image'); // alt картинки в темплейте
    const deleteButton = cardElement.querySelector('.card__delete-button');  // кнопка удаления карточки в темплейте
    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка лайка в темплейте
    const likeCounter = cardElement.querySelector('.card__like-counter') // счетчик лайков
    

    cardName.textContent = card.name; // передаем значение
    cardImage.src = card.link; // передаем значение на ссылук
    cardImageName.alt = card.name; // передаем значение такое как в тайтл
    likeCounter.textContent = item.likes.length;
    cardElement.id = item._id;

    let myLike
    item.likes.forEach((user) => {
        myLike = user._id === myID
    })
    
    const myCard = myID === item.owner._id

    if (myCard) {
        deleteButton.addEventListener('click', () => {
            removeCard(cardElement, item._id);
          })
    } else {
        deleteButton.classList.add('card__delete-button-hidden');
    }
    
    if (myLike) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
    

    likeButton.addEventListener('click', (evt) => {
        likeCard(evt, item._id)
    });  // слушатель на кнопку лайка с вызовом функции лайка
   
    cardImage.addEventListener('click', openImage);  // слушатель на картинку в карточке с вызовом функции открыть попап

    return cardElement;
};

// Функция удаления карточки
export function removeCard (card, cardId) {
  deleteCard(cardId)
    .then(() => {
        card.remove();
    })
    .catch (err => { 
        console.error(err) 
    })
};

// Функция лайка карточки
export function likeCard (evt, cardId) {
     const a = evt.target.classList.toggle('card__like-button_is-active');
     const b = a ? putLike(cardId) : deleteLike(cardId);
     const cardItem = document.getElementById(cardId);
     const cardItemLikeCounter = cardItem.querySelector('.card__like-counter')

     b.then(res => {
        cardItemLikeCounter.textContent = res.likes.length;
     })
     .catch (err => { 
        console.error(err) 
    })
};