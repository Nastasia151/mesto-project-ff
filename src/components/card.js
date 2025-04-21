import { deleteCard, putLike, deleteLike } from './api.js';

// @todo: Функция создания карточки

const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки

export const createCard = (card, removeCard, likeCard, openImage, userId, cardItem) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем темплейт
    
    const cardName = cardElement.querySelector('.card__title'); // тайтл карточки в темплейте
    const cardImage = cardElement.querySelector('.card__image');  // картинка в темплейте
    const deleteButton = cardElement.querySelector('.card__delete-button');  // кнопка удаления карточки в темплейте
    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка лайка в темплейте
    const likeCounter = cardElement.querySelector('.card__like-counter') // счетчик лайков
    

    cardName.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    likeCounter.textContent = cardItem.likes.length;
    cardElement.id = cardItem._id;

    let userLike
    cardItem.likes.some((user) => {
        userLike = user._id === userId;
    })
    
    const userCard = userId === cardItem.owner._id;

    if (userCard) {
      deleteButton.addEventListener('click', () => {
        removeCard(cardElement, cardItem._id);
      })
    } else {
        deleteButton.classList.add('card__delete-button-hidden');
    };
    
    if (userLike) {
      likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
    
    likeButton.addEventListener('click', (evt) => {
      likeCard(evt, cardItem._id)
    });
   
    cardImage.addEventListener('click', openImage);
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
  const clickLikeEvent = evt.target.classList.toggle('card__like-button_is-active');
  const clickLikeAction = () => {
    if(clickLikeEvent) {
      return putLike(cardId);
    } else {
      return deleteLike(cardId);
    }
  };   
  const cardItem = document.getElementById(cardId);
  const cardItemLikeCounter = cardItem.querySelector('.card__like-counter')
  clickLikeAction()
    .then(res => {
      cardItemLikeCounter.textContent = res.likes.length;
    })
    .catch (err => { 
        console.error(err) 
    });
};