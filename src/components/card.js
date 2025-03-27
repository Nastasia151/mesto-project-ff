import { cardTemplate, removeCard, likeCard, openImage } from '../scripts/index.js';

// @todo: Функция создания карточки

export const createCard = (card, removeCard, likeCard, openImage) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем темплейт
    
    const cardName = cardElement.querySelector('.card__title'); // тайтл карточки в темплейте
    cardName.textContent = card.name; // передаем значение
    const cardImage = cardElement.querySelector('.card__image');  // картинка в темплейте
    cardImage.src = card.link; // передаем значение на ссылук
    const cardImageName = cardElement.querySelector('.card__image'); // alt картинки в темплейте
    cardImageName.alt = card.name; // передаем значение такое как в тайтл

    const deleteButton = cardElement.querySelector('.card__delete-button');  // кнопка удаления карточки в темплейте
    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка лайка в темплейте
    
    deleteButton.addEventListener('click', () => {  // слушатель на кнопку удаления с вызовом функции удаления
       removeCard(cardElement);
    });

    likeButton.addEventListener('click', likeCard);  // слушатель на кнопку лайка с вызовом функции лайка
    cardImage.addEventListener('click', openImage);  // слушатель на картинку в карточке с вызом функции открыть попап

    return cardElement;
};