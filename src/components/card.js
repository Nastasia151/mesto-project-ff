import { cardTemplate, removeCard, likeCard, open } from '../scripts/index.js';

// @todo: Функция создания карточки

export const createCard = (card, removeCard, likeCard, open) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardName = cardElement.querySelector('.card__title');
    cardName.textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    const cardImageName = cardElement.querySelector('.card__image');
    cardImageName.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    deleteButton.addEventListener('click', () => {
       removeCard(cardElement);
    });

    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', open);

    return cardElement;
};